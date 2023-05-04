# Fatten

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

Transform dot-notation-like objects into optimised nested objects.

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/spatiebe.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/spatie.be)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Installation

```bash
npm install fatten
```

```bash
yarn add fatten
```

## Usage

```ts
import { fatten } from 'fatten';

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

const nestedObject = fatten(flatObject, { separator: '_' });
/*
    {
        a: {
            b: { c: 1, d: 2, e: 3 },
            f: 4
        },
        b: {
            cDE: 5 },
            fD: { e: 6, f: 7 }
        },
        c: 8
    }
*/
```

## Changelog

Please see [releases](https://github.com/spatie/fatten/releases) for more information what has changed recently.

## Testing

```bash
npm run test
```

## Contributing

Please see [CONTRIBUTING](https://github.com/spatie/.github/blob/main/CONTRIBUTING.md) for details.

## Security

If you've found a bug regarding security please mail [security@spatie.be](mailto:security@spatie.be) instead of using the issue tracker.

## Credits

- [Sam Apostel](https://github.com/Sam-Apostel)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.



[build-img]:https://github.com/spatie/fatten/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/spatie/fatten/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/fatten
[downloads-url]:https://www.npmtrends.com/fatten
[npm-img]:https://img.shields.io/npm/v/fatten
[npm-url]:https://www.npmjs.com/package/fatten
[issues-img]:https://img.shields.io/github/issues/spatie/fatten
[issues-url]:https://github.com/spatie/fatten/issues
[codecov-img]:https://codecov.io/gh/spatie/fatten/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/spatie/fatten
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/