'use client';

import { useIsMobile } from '@/hooks/use-is-mobile';

import { ChatDrawer, DrawerHamburgerTrigger } from '@/components/chat/chat-drawer';
import { ChatHeader } from '@/components/chat/chat-header';
import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';

export const MobileContainer = () => {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <ChatDrawer>
        <ChatHeader>
          <DrawerHamburgerTrigger />
          <Icons.TextChannelHash className="mr-2 text-channel-icon" />
          Select a guild
        </ChatHeader>

        <div className="size-full flex-1 center vertical">
          <Column className="prose relative w-full flex-1 center vertical">
            <h2 className="mb-0">Connect with your community</h2>
            <p className="mt-0">
              Explore or create a guild to connect, collaborate, and grow your community.
            </p>
          </Column>
        </div>
      </ChatDrawer>
    );

  return (
    <ChatDrawer>
    
    </ChatDrawer>
  );
};
