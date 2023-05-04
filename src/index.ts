type Entry = [string, any];
type Nested = { [key: string]: Nested | any };

function camelJoin(first: string, second: string) {
	return first + second.charAt(0).toUpperCase() + second.slice(1);
}

function blowUpWith(options: { separator: string; leafKey: string }) {
	function blowUp(acc: Nested, [key, condition]: Entry): Nested {
		const [context, ...rest] = key.split(options.separator);

		if (!rest.length) {
			return {
				...acc,
				[context]: {
					...(acc[context] ?? {}),
					[options.leafKey]: condition,
				},
			};
		}

		return {
			...acc,
			[context]: blowUp(acc[context] ?? {}, [rest.join(options.separator), condition]),
		};
	}

	return blowUp;
}

function deflate(nested: Nested, leafKey: string): Nested {
	return Object.fromEntries(
		Object.entries(nested).map(([key, value]: [key: string, value: Nested]) => {
			if (key === leafKey) return [key, value];

			const values = Object.entries(value);
			if (values.length === 1) {
				const [nodeKey, nodeValue] = values[0];
				if (nodeKey === leafKey) {
					return [key, nodeValue];
				} else {
					return Object.entries(deflate({ [camelJoin(key, nodeKey)]: nodeValue }, leafKey))[0];
				}
			}
			return [key, deflate(value, leafKey)];
		})
	);
}

export function fatten(
	object: Record<string, any>,
	{ separator = '.', leafKey = '_' } = { separator: '.', leafKey: '_' }
): Nested {
	return deflate(Object.entries(object).reduce(blowUpWith({ separator, leafKey }), {}), leafKey);
}
