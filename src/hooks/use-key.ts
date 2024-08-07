import { useRef } from 'react';
import { useEventListener } from '@/hooks/use-event-listener';

export const useKey = <Fn extends (e: KeyboardEvent) => void>(key: string, fn: Fn) => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEventListener('keydown', e => {
    if (e.key === key) {
      fn(e);
    }
  });
};
