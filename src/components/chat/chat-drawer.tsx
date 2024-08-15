'use client';

import { Drawer } from 'vaul';

import { useDrawerStore } from '@/stores/drawer-store';

export const ChatDrawer = ({ children }: React.PropsWithChildren) => {
  const { isOpen, setIsOpen } = useDrawerStore();

  return (
    <Drawer.Root
      noBodyStyles
      disablePreventScroll
      closeThreshold={0.5}
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
    >
      <Drawer.Portal >
        <Drawer.Content className="fixed bottom-0 right-0 z-50 size-full flex-1 bg-background vertical">
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export const ChatDrawerTrigger = ({ children }: React.PropsWithChildren) => {
  return <Drawer.Trigger>{children}</Drawer.Trigger>;
};
