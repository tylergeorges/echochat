import { TerminalLabel } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

export const ChatHeader = ({ children }: React.PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <header
      className={cn(
        'text-md relative flex h-12 items-center p-4 font-bold',
        theme === 'terminal' && 'border-2'
      )}
    >
      {theme === 'terminal' && <TerminalLabel className="-top-4">channel</TerminalLabel>}

      {children}
    </header>
  );
};
