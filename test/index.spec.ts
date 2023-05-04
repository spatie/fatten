import { fatten } from '../src';

describe('fatten', () => {
	it('should transform dot-notation-like objects into optimised nested objects', () => {
		const flatObject = {
			'a.b.c': 1,
			'a.b.d': 2,
			'a.b.e': 3,
			'a.f': 4,
			'b.c.d.e': 5,
			'b.f.d.e': 6,
			'b.f.d.f': 7,
			'c': 8
		};

		expect(fatten(flatObject)).toEqual({
			a: {
				b: { c: 1, d: 2, e: 3 },
				f: 4
			},
			b: {
				cDE: 5,
				fD: { e: 6, f: 7 }
			},
			c: 8
		});
	});

	it('should transform underscore-notation', () => {
		const flatObject = {
			a_b_c: 1,
			a_b_d: 2,
			a_b_e: 3,
			a_f: 4,
			b_c_d_e: 5,
			b_f_d_e: 6,
			b_f_d_f: 7,
			c: 8
		};

		expect(fatten(flatObject, { separator: '_' })).toEqual({
			a: {
				b: { c: 1, d: 2, e: 3 },
				f: 4
			},
			b: {
				cDE: 5,
				fD: { e: 6, f: 7 }
			},
			c: 8
		});
	});

	it('should handle leaf node in a path', () => {
		const flatObject = {
			'a': 1,
			'a.b': 2,
			'a.b.c': 3,
			'a.b.d': 4,
			'b.c.d.e': 5,
			'c': 8
		};

		expect(fatten(flatObject)).toEqual({
			a: {
				_: 1,
				b: { _: 2, c: 3, d: 4 },
			},
			bCDE: 5,
			c: 8
		});
	});

	it('should handle a custom leaf key', () => {
		const flatObject = {
			'a': 1,
			'a.b': 2,
			'a.b.c': 3,
			'a.b.d': 4,
			'b.c.d.e': 5,
			'c': 8
		};

		expect(fatten(flatObject, { leafKey: 'value' })).toEqual({
			a: {
				value: 1,
				b: { value: 2, c: 3, d: 4 },
			},
			bCDE: 5,
			c: 8
		});
	});

	it('should handle a custom leaf key and custom notation at the same time', () => {
		const flatObject = {
			a: 1,
			a_b: 2,
			a_b_c: 3,
			a_b_d: 4,
			b_c_d_e: 5,
			c: 8
		};

		expect(fatten(flatObject, { leafKey: 'value', separator: '_' })).toEqual({
			a: {
				value: 1,
				b: { value: 2, c: 3, d: 4 },
			},
			bCDE: 5,
			c: 8
		});
	});

	it('should handle empty objects', () => {
		expect(fatten({ })).toEqual({});
	});
});