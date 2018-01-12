const replace = require('stream-replace');
const exp     = /{{\s?([\w-.]+?)(?:\s*:\s*(?:['"])?([\w-. ]+?)(?:['"])?)?\s?}}/g;

function replacer(parameters) {
  return (match, parameter, defaultValue) => {
    if (typeof parameters[parameter] !== 'undefined') {
      return parameters[parameter];
    }

    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }

    return match;
  };
}

module.exports = parameters => replace(exp, replacer(parameters));
module.exports.sync = (target, parameters) => target.replace(exp, replacer(parameters));
