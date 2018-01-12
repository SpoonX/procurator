const {Homefront} = require('homefront');

module.exports = (target, parameters, recursive = true, limit = 100) => {
  let replaceCount = 0;
  const params     = new Homefront(parameters);
  const exp        = /{{\s?([\w-.]+?)(?:\s*:\s*(?:['"])?([\w-. /\\]+?)(?:['"])?)?\s?}}/g;
  const replacer   = (match, parameter, defaultValue) => {
    return params.fetch(parameter, (typeof defaultValue === 'string') ? defaultValue : match);
  };

  if (!recursive) {
    return target.replace(exp, replacer);
  }

  while (replaceCount++ < limit) {
    let replaced = target.replace(exp, replacer);

    if (replaced === target) {
      return replaced;
    }

    target = replaced;
  }

  throw new Error(`Replacement recursion of ${limit} reached. You probably have a circular replacement value.`);
};
