import { strict as assert } from 'node:assert';
import { jsonp } from '../src/index.js';

describe('index.test.ts', () => {
  it('should return with padding', () => {
    assert.equal(jsonp({ foo: 'bar' }, 'f.f[1]$'),
      '/**/ typeof f.f[1]$ === \'function\' && f.f[1]$({"foo":"bar"});');
    assert.equal(jsonp({ foo: 'bar' }, 'fn'),
      '/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
    assert.equal(jsonp({ foo: 'bar' }, [ 'fn' ]),
      '/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
    assert.equal(jsonp({ foo: 'bar' }, [ 'fn', 'fn2' ]),
      '/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
  });

  it('should return without padding', () => {
    assert.equal(jsonp({ foo: 'bar' }, ''), '{"foo":"bar"}');
    assert.equal(jsonp({ foo: 'bar' }), '{"foo":"bar"}');
    assert.equal((jsonp as any)({ foo: 'bar' }, null), '{"foo":"bar"}');
    assert.equal((jsonp as any)({ foo: 'bar' }, 1), '{"foo":"bar"}');
    assert.equal(jsonp({ foo: 'bar' }, []), '{"foo":"bar"}');
    assert.equal((jsonp as any)({ foo: 'bar' }, [ null ]), '{"foo":"bar"}');
  });

  it('should replace unsafe characters', () => {
    assert.equal(jsonp({ foo: 'bar' }, '~~~```fn---中文\u1231'),
      '/**/ typeof fn === \'function\' && fn({"foo":"bar"});');
    assert.equal(jsonp({ foo: 'bar' }, [ 'fn哈哈\\!@#%^&*(){},?/ \tok' ]),
      '/**/ typeof fnok === \'function\' && fnok({"foo":"bar"});');
  });

  it('should handle \\u2028 and \\u2029', () => {
    assert.equal(jsonp({ foo: 'bar\u2029-ok\u2028' }, 'fn2'),
      '/**/ typeof fn2 === \'function\' && fn2({"foo":"bar\\u2029-ok\\u2028"});');
  });

  it('should callback work', done => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function fn2(data: any) {
      assert.deepEqual(data, { foo: 'bar\u2029-ok\u2028' });
      done();
    }
    // eslint-disable-next-line no-eval
    eval(jsonp({ foo: 'bar\u2029-ok\u2028' }, 'fn2'));
  });

  it('should handle buffer', function() {
    assert.equal(jsonp(Buffer.from('foo'), 'fn'),
      '/**/ typeof fn === \'function\' && fn(' + JSON.stringify(Buffer.from('foo')) + ');');
  });

  it('should limit callback length', function() {
    assert.equal(jsonp(Buffer.from('foo'), 'fnfn', { limit: 2 }),
      '/**/ typeof fn === \'function\' && fn(' + JSON.stringify(Buffer.from('foo')) + ');');
  });
});
