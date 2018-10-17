import { Transform } from 'stream';
import { replace } from './replace';
import { createTransform } from './createTransform';

export const stream = (parameters: { [key: string]: any }, recursive?: boolean, limit?: number): Transform => {
  return createTransform(chunk => replace(chunk, parameters, recursive, limit));
};
