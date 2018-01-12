# procurator

A tiny, super fast, stream based replacement template engine. **Now recursive! (keep reading to learn what that means)**

This module has few features.

* Simple variables
* Defaults for variables
* Support for nested variables (recursive)

## Installation

Simply use your package manager of choice.

* `npm i --save procurator`
* `yarn add procurator`

## Usage

`procurator(parameters[, recursive, limit])`

Code speaks. Let's do this.

**some.template.js**

```js
module.exports = {
  // Simple replace
  hello: '{{ foo }}',

  // With a default
  cake: '{{ bar : lies }}',

  // Defaults get trimmed, let's use quotes
  bacon: '{{ bat : ' holds the truth ' }}',

  // Let's use double quotes
  empire: '{{ baz:"I haz one" }}',
};
```

**app.js**

```js
const procurator = require('procurator');
const fs         = require('fs');

let readStream  = fs.createReadStream('./some.template.js');
let writeStream = fs.createWriteStream('./out-file.js');
let parameters  = {foo: 'Batman', bat: 'is holy'};
let recursive   = true; // New: replace more than once to allow for nested variables
let limit       = 100; // New: the maximum replacement depth. Throws an Error when reached.

readStream.pipe(procurator(parameters, recursive, limit)).pipe(writeStream);
```

**Produces ./out-file.js:**

```js
module.exports = {
  // Simple replace
  hello: 'Batman',

  // With a default
  cake: 'lies',

  // Defaults get trimmed, let's use quotes
  bacon: 'is holy',

  // Let's use double quotes
  empire: 'I haz one',
};
```

_**Note**: The file extension doesn't matter. I used .js but it can be anything._

### Sync

`procurator(target, parameters[, recursive, limit])`

Sometimes you just want to apply replaces in memory.
For that purpose, a memory and code-size efficient method has been added.

```js
const procurator = require('procurator');
const target     = 'Hello {{addressed: "world"}}! How are you doing {{ when: "today"}}?';
const recursive  = true; // New: replace more than once to allow for nested variables
const limit      = 100; // New: the maximum replacement depth. Throws an Error when reached.

console.log(procurator.sync(target, {addressed: 'developer'}, recursive, limit));

// Outputs: Hello developer! How are you doing today?
```

### Nested variables

As of v2.0.0, Procurator supports nested variables.
This means you can do the following (using sync for simplicity):

```js
const procurator = require('procurator');
const target     = 'Hello {{addressed: "{{title: "Mr."}} world"}}! How are you doing {{ when: "today" }}?';
const recursive  = true; // New: replace more than once to allow for nested variables
const limit      = 100; // New: the maximum replacement depth. Throws an Error when reached.

console.log(procurator.sync(target, {title: 'Mrs.'}, recursive, limit));

// Outputs: Hello Mrs. world! How are you doing today?
```

This also works for parameters themselves; 
meaning that you can replace placeholders with strings that also contain placeholders.

## Known limitations

### Multi line placeholders

It's currently not possible to spread a placeholder over multiple lines.
If you have a use case for this please create an issue.

## License

MIT
