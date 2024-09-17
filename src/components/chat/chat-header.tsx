import { cn } from '@/lib/utils';

export const ChatHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <header className={cn('text-md relative flex h-12 items-center p-4 font-bold', '')}>
      {children}
    </header>
  );
};
