import { Drawer } from 'vaul';

import { useDrawerStore } from '@/stores/drawer-store';

export const ChatDrawer = ({ children }: React.PropsWithChildren) => {
  const { isOpen, setIsOpen } = useDrawerStore();

  return (
    <Drawer.Root
      // closeThreshold={0.1}
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
      noBodyStyles
    >
      <Drawer.Portal>
        <Drawer.Content className="fixed z-50 size-full flex-1 overflow-hidden bg-background vertical">
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export const ChatDrawerTrigger = ({ children }: React.PropsWithChildren) => {
  return <Drawer.Trigger className="mr-6">{children}</Drawer.Trigger>;
};
