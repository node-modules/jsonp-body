jsonp-body
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/jsonp-body.svg?style=flat
[npm-url]: https://npmjs.org/package/jsonp-body
[travis-image]: https://img.shields.io/travis/node-modules/jsonp-body.svg?style=flat
[travis-url]: https://travis-ci.org/node-modules/jsonp-body
[coveralls-image]: https://img.shields.io/coveralls/node-modules/jsonp-body.svg?style=flat
[coveralls-url]: https://coveralls.io/r/node-modules/jsonp-body?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/dev/node-modules/jsonp-body.svg?style=flat
[david-url]: https://david-dm.org/node-modules/jsonp-body

![logo](https://raw.github.com/node-modules/jsonp-body/master/logo.png)

Helper to create more safe jsonp response body for [koa](http://koajs.com/) and other web framework.

## Install

```bash
$ npm install jsonp-body
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

## License

(The MIT License)

Copyright (c) 2014 fengmk2 &lt;fengmk2@gmail.com&gt; and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
