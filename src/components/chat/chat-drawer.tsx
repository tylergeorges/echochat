import { Drawer } from 'vaul';

import { useDrawerStore } from '@/stores/drawer-store';
import { cn } from '@/lib/utils';

export const ChatDrawer = ({ children }: React.PropsWithChildren<{ disabled?: boolean }>) => {
  const { isOpen, setIsOpen } = useDrawerStore();

  return (
    <Drawer.Root
      modal={false}
      open={isOpen}
      onOpenChange={setIsOpen}
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
