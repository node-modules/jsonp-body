# jsonp-body

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/jsonp-body.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jsonp-body
[travis-image]: https://img.shields.io/travis/node-modules/jsonp-body.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/jsonp-body
[coveralls-image]: https://img.shields.io/coveralls/node-modules/jsonp-body.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/node-modules/jsonp-body?branch=master

Helper to create more safe jsonp response body for [koa](http://koajs.com/) and other web framework.

## Install

```bash
$ npm install jsonp-body --save
```

## Usage

```js
var koa = require('koa');
var jsonp = require('jsonp-body');

var app = koa();
app.use(function* () {
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

### #jsonp(obj, callback, options)

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
