import { StringDecoder } from 'string_decoder';
import { Transform } from 'stream';
import { replace } from './replace';

export const stream = (parameters: { [key: string]: any }, recursive?: boolean, limit?: number): Transform => {
  const decoder = new StringDecoder('utf8');
  let last = '';

  return new Transform({
    transform(chunk, encoding, callback) {
      if (last === undefined) {
        last = '';
      }

      last += decoder.write(chunk);
      let list   = last.split(/\n/);
      last = list.pop();

      for (let i = 0; i < list.length; i++) {
        if (typeof list[i] !== 'string') {
          continue;
        }

        this.push(replace(list[i], parameters, recursive, limit) + '\n');
      }

      callback();
    },

    flush(callback) {
      last += decoder.end();

      last && this.push(replace(last, parameters, recursive, limit));

      callback();
    }
  });
};
