export const ChatHeader = ({ children }: React.PropsWithChildren) => (
  <header className="text-md flex h-12 items-center border-b border-foreground/15 px-3 font-semibold">
    {children}
  </header>
);
