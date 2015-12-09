/**
 * Copyright(c) node-modules and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var jsonp = require('../');

describe('index.test.js', function () {
  it('should return with padding', function () {
    jsonp({foo: 'bar'}, 'f.f[1]$')
      .should.equal('/**/ typeof f.f[1]$ === \'function\' && f.f[1]$({"foo":"bar"});');
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

  it('should replace unsafe characters', function () {
    jsonp({foo: 'bar'}, '~~~```fn---中文\u1231')
      .should.equal('/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
    jsonp({foo: 'bar'}, ['fn哈哈\\!@#%^&*(){},?/ \tok'])
      .should.equal('/**/ typeof fnok === \'function\' && fnok({"foo":"bar"});');
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
    /* jshint ignore:start */
    eval(jsonp({foo: 'bar\u2029-ok\u2028'}, 'fn2'));
    /* jshint ignore:end */
  });

  it('should handle buffer', function () {
    jsonp(new Buffer('foo'), 'fn')
      .should.equal('/**/ typeof fn === \'function\' && fn(' + JSON.stringify(new Buffer('foo')) + ');');
  });

  it('should limit callback length', function () {
    jsonp(new Buffer('foo'), 'fnfn', {limit: 2})
      .should.equal('/**/ typeof fn === \'function\' && fn(' + JSON.stringify(new Buffer('foo')) + ');');
  });
});
