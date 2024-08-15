'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Drawer } from 'vaul';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import type { User } from '@/lib/db/schema';
import { useDrawerStore } from '@/stores/drawer-store';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';

interface ChatProps {
  channelId: string;
  guildId: string;
  currentUser: User;
}

export const Chat = ({ channelId, guildId, currentUser }: ChatProps) => {
  const { isOpen, setIsOpen } = useDrawerStore();
  const { data: channel } = useSuspenseQuery(useChannelQuery(channelId));
  const { data: guild } = useQuery(useGuildQuery(guildId, currentUser.id));

  return (
    <Drawer.Root
      noBodyStyles
      disablePreventScroll
      closeThreshold={0.5}
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 right-0 z-50 size-full flex-1 bg-background vertical">
          <Column className="relative size-full flex-1">
            <ChatHeader>
              <Drawer.Trigger>
                <Icons.Hamburger className="mr-6 size-5" />
              </Drawer.Trigger>

              <Icons.TextChannelHash className="mr-2 text-channel-icon" />
              {channel.name}
            </ChatHeader>

            <Column className="h-full flex-1 justify-end">
              {channel && guild && (
                <>
                  <ChatMessages guild={guild} channel={channel} channelId={channel.id} />
                  <ChatInput channel={channel} />
                </>
              )}
            </Column>
          </Column>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
