/**!
 * jsonp-body - test/index.test.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var jsonp = require('../');

describe('index.test.js', function () {
  it('should return with padding', function () {
    jsonp({foo: 'bar'}, 'fn')
      .should.equal('/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
    jsonp({foo: 'bar'}, ['fn'])
      .should.equal('/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
    jsonp({foo: 'bar'}, ['fn', 'fn2'])
      .should.equal('/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
  });

  it('should return without padding', function () {
    jsonp({foo: 'bar'}, '').should.equal('{"foo":"bar"}');
    jsonp({foo: 'bar'}).should.equal('{"foo":"bar"}');
    jsonp({foo: 'bar'}, null).should.equal('{"foo":"bar"}');
    jsonp({foo: 'bar'}, 1).should.equal('{"foo":"bar"}');
    jsonp({foo: 'bar'}, []).should.equal('{"foo":"bar"}');
    jsonp({foo: 'bar'}, [null]).should.equal('{"foo":"bar"}');
  });

  it('should handle \\u2028 and \\u2029', function () {
    jsonp({foo: 'bar\u2029-ok\u2028'}, 'fn2')
      .should.equal('/**/ typeof fn2 === \'function\' && fn2({"foo":"bar\\u2029-ok\\u2028"});');
  });

  it('should callback work', function (done) {
    function fn2(data) {
      data.should.eql({foo: 'bar\u2029-ok\u2028'});
      done();
    }
    eval(jsonp({foo: 'bar\u2029-ok\u2028'}, 'fn2'));
  });

  it('should handle buffer', function () {
    jsonp(new Buffer('foo'), 'fn')
      .should.equal('/**/ typeof fn === \'function\' && fn(' + JSON.stringify(new Buffer('foo')) + ');');
  });
});
