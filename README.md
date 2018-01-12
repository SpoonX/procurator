# procurator

A tiny, super fast, stream based replacement template engine.

This module has few features.

* Simple variables
* Defaults for variables

## Installation

Simply use your package manager of choice.

* `npm i --save procurator`
* `yarn add procurator`

## Usage

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

readStream.pipe(procurator(parameters)).pipe(writeStream);
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

Sometimes you just want to apply replaces in memory.
For that purpose, a memory and code-size efficient method has been added.

```js
const procurator = require('procurator');
const target     = 'Hello {{addressed: "world"}}! How are you doing {{ when: "today"}}?';

console.log(procurator.sync(target, {addressed: 'developer'}));

// Outputs: Hello developer! How are you doing today?
```

## License

MIT
