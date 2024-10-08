import { isObject } from '@/lib/utils';

const getObjectMessage = (obj: Record<string, unknown>): string => {
  if (typeof obj.message === 'string') {
    return obj.message;
  }
  if (obj.toString !== Object.prototype.toString) {
    return obj.toString();
  }
  try {
    return JSON.stringify(obj);
  } catch {
    return String(obj);
  }
};

const isError = (err: unknown): err is Error =>
  isObject(err) &&
  typeof err.name === 'string' &&
  typeof err.message === 'string' &&
  (!('stack' in err) || typeof err.stack === 'string');

export const asError = (err: unknown): Error => {
  if (isError(err)) return err;

  const error = new Error(isObject(err) ? getObjectMessage(err) : String(err));
  error.name = (isObject(err) && err.constructor.name) || typeof err;

  return error;
};
