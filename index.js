const replace = require('stream-replace');
const fs      = require('fs');

module.exports = parameters => replace(/\{\{\s?([\w-.]+?)(?:\s*\:\s*(?:'|")?([\w-. ]+?)(?:'|")?)?\s?}}/g, (match, parameter, defaultValue) => {
  console.log(defaultValue);
  if (typeof parameters[parameter] !== 'undefined') {
    return parameters[parameter];
  }

  if (typeof defaultValue !== 'undefined') {
    return defaultValue;
  }

  return match;
});
