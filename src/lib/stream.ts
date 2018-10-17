import { StringDecoder } from 'string_decoder';
import { Transform } from 'stream';
import { replace } from './replace';

export const stream = (parameters: { [key: string]: any }, recursive: boolean, limit: number): Transform => {
  const decoder = new StringDecoder('utf8');

  return new Transform({
    transform(chunk, encoding, callback) {
      if (this._last === undefined) {
        this._last = '';
      }

      this._last += decoder.write(chunk);
      let list   = this._last.split(/\n/);
      this._last = list.pop();

      for (let i = 0; i < list.length; i++) {
        if (typeof list[i] !== 'string') {
          continue;
        }

        this.push(replace(list[i], parameters, recursive, limit) + '\n');
      }

      callback();
    },

    flush(callback) {
      this._last += decoder.end();

      this._last && this.push(replace(this._last, parameters, recursive, limit));

      callback();
    }
  });
};
