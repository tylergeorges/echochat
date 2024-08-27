'use client';

import { useState } from 'react';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

export function useMediaQuery(
  query: string,
  { defaultValue = false }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia(query).matches;
  });

  // Handles the change event of the media query.
  const handleChange = () => {
    const newMatches = getMatches(query);

    setMatches(prevMatches => {
      if (newMatches === prevMatches) return prevMatches;

      return newMatches;
    });
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
