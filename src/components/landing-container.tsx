'use client';

import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

import { TerminalLabel } from '@/components/ui/label';

export const LandingContainer = ({ children }: React.PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div className={cn('relative flex-1 vertical', theme === 'terminal' && 'my-4 mr-4 border-2')}>
      {children}

      {theme === 'terminal' && <TerminalLabel className="-top-4">welcome</TerminalLabel>}
    </div>
  );
};
