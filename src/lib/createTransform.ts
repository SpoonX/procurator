import { StringDecoder } from 'string_decoder';
import { Transform } from 'stream';

export const createTransform = (transformer: (data: string) => string) => {
  const decoder = new StringDecoder('utf8');

  return new Transform({
    transform (chunk, encoding, callback) {
      this.push(transformer(decoder.write(chunk)));

      callback();
    },

    flush (callback) {
      const last = decoder.end();

      last && this.push(transformer(last));

      callback();
    },
  });
};
