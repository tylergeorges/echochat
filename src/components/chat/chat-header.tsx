import { TerminalLabel } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const ChatHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <header
      className={cn('text-md relative flex h-12 items-center p-4 font-bold', 'terminal:border-2')}
    >
      {<TerminalLabel className="-top-4">channel</TerminalLabel>}

      {children}
    </header>
  );
};
