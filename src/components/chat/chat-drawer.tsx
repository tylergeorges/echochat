'use client';

import { Drawer } from 'vaul';

import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { useDrawerStore } from '@/stores/drawer-store';

import { Icons } from '@/components/icons';

interface ChatDrawerProps {
  disabled?: boolean;
}

export const ChatDrawer = ({ children, disabled }: React.PropsWithChildren<ChatDrawerProps>) => {
  const { isOpen, setIsOpen } = useDrawerStore();

  return (
    <Drawer.Root
      modal={false}
      open={isOpen}
      onOpenChange={setIsOpen}
      dismissible={!disabled}
      direction="right"
      noBodyStyles
      disablePreventScroll
    >
      <Drawer.Portal>
        <Drawer.Content
          className={cn(
            'fixed z-50 size-full flex-1 overflow-hidden bg-background outline-none vertical'
          )}
        >
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export const ChatDrawerTrigger = ({ children }: React.PropsWithChildren) => {
  return <Drawer.Trigger className="mr-6">{children}</Drawer.Trigger>;
};

export const DrawerHamburgerTrigger = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <ChatDrawerTrigger>
      <Icons.Hamburger className="size-5" />
    </ChatDrawerTrigger>
  );
};
