'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';

export const TerminalContainer = ({ children }: React.PropsWithChildren) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return children;
};
