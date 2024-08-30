import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin; // browser should use relative url
  // if (typeof window !== 'undefined') return `http://localhost:${process.env.PORT ?? 3000}`; // browser should use relative url

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value != null;

export const generateUuid = () => crypto.randomUUID();
