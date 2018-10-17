import { Transform } from 'stream';
import { replace } from './replace';
import { createReplaceTransform } from './createReplaceTransform';

export const stream = (parameters: { [key: string]: any }, recursive?: boolean, limit?: number): Transform => {
  return createReplaceTransform(chunk => replace(chunk, parameters, recursive, limit));
};
