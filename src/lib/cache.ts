/* eslint-disable @typescript-eslint/return-await */
import { cache as reactCache } from 'react';

export const cache = <Fn extends (...args: (keyof never)[]) => any>(fn: Fn) => {
  const cachedFn = reactCache(fn);

  return async (...params: Parameters<Fn>) => await cachedFn(...params);
};
