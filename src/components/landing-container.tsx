'use client';

import { cn } from '@/lib/utils';

import { TerminalLabel } from '@/components/ui/label';

export const LandingContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={cn('relative flex-1 vertical', 'terminal:my-4 terminal:mr-4 terminal:border-2')}
    >
      {children}

      {<TerminalLabel className="-top-4">welcome</TerminalLabel>}
    </div>
  );
};
