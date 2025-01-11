# jsonp-body

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/node-modules/jsonp-body/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/jsonp-body/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![Node.js Version](https://img.shields.io/node/v/jsonp-body.svg?style=flat)](https://nodejs.org/en/download/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

[npm-image]: https://img.shields.io/npm/v/jsonp-body.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jsonp-body
[codecov-image]: https://img.shields.io/codecov/c/github/node-modules/jsonp-body.svg?style=flat-square
[codecov-url]: https://codecov.io/github/node-modules/jsonp-body?branch=master
[snyk-image]: https://snyk.io/test/npm/jsonp-body/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/jsonp-body
[download-image]: https://img.shields.io/npm/dm/jsonp-body.svg?style=flat-square
[download-url]: https://npmjs.org/package/jsonp-body

Helper to create more safe jsonp response body for [koa](http://koajs.com/) and other web framework.

## Install

```bash
npm install jsonp-body --save
```

## Usage

```js
const koa = require('koa');
const { jsonp } = require('jsonp-body');

var app = koa();
app.use(async function () {
  this.set('X-Content-Type-Options', 'nosniff');
  if (this.query.callback) {
    this.set('Content-Type', 'text/javascript');
  } else {
    this.set('Content-Type', 'application/json');
  }
  this.body = jsonp({foo: 'bar'}, this.query.callback);
});
```

## API Reference

### `jsonp(obj, callback, options)`

Get `obj` jsonp string response with `callback`.

- __obj__: object convert to JSON string
- __callback__: callback function name
- __options__: optional for `JSON.stringify`
  - __limit__: length limit for `callback`, default to `512`
  - __replacer__: replacer in `JSON.stringify(obj, [replacer, [space]])`
  - __space__: space in `JSON.stringify(obj, [replacer, [space]])`

## License

[MIT](LICENSE)

## Contributors

[![Contributors](https://contrib.rocks/image?repo=node-modules/jsonp-body)](https://github.com/node-modules/jsonp-body/graphs/contributors)

Made with [contributors-img](https://contrib.rocks).
