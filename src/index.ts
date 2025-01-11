interface Options {
  /** length limit for callback function name, default to `512` */
  limit?: number;
  /** replacer in `JSON.stringify(obj, [replacer, [space]])` */
  replacer?: Parameters<typeof JSON.stringify>[1];
  /** space in `JSON.stringify(obj, [replacer, [space]])` */
  space?: Parameters<typeof JSON.stringify>[2];
}

export function jsonp(obj: any, callback?: string | string[], options: Options = {}): string {
  // fixup callback when `this.query.callback` return Array
  if (Array.isArray(callback)) {
    callback = callback[0];
  }

  const limit = options.limit ?? 512;

  // replace chars not allowed in JavaScript that are in JSON
  // JSON parse vs eval fix. @see https://github.com/rack/rack-contrib/pull/37
  const body = JSON.stringify(obj, options.replacer, options.space)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  if (typeof callback !== 'string' || callback.length === 0) {
    return body;
  }

  // limit callback length
  if (callback.length > limit) {
    callback = callback.substring(0, limit);
  }

  // Only allow "[","]","a-zA-Z0123456789_", "$" and "." characters.
  const cb = callback.replace(/[^\[\]\w\$\.]+/g, '');

  // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
  // @see https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-4671
  // @see http://miki.it/blog/2014/7/8/abusing-jsonp-with-rosetta-flash/
  // @see http://drops.wooyun.org/tips/2554
  //
  // the typeof check is just to reduce client error noise
  return '/**/ typeof ' + cb + ' === \'function\' && ' + cb + '(' + body + ');';
}
