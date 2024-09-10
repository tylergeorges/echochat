'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Drawer } from 'vaul';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import { useIsMobile } from '@/hooks/use-is-mobile';
import type { Guild } from '@/lib/db/queries/guild';
import type { User } from '@/lib/db/schema';
import { useTheme } from '@/providers/theme-provider';

import { ChatDrawer, ChatDrawerTrigger } from '@/components/chat/chat-drawer';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface ChatProps {
  channelId: string;
  guildId: string;
  currentUser: User;
}

export const Chat = ({ channelId, guildId, currentUser }: ChatProps) => {
  const isMobile = useIsMobile();

  const { data: channel } = useSuspenseQuery(useChannelQuery(channelId));
  const { data } = useSuspenseQuery(useGuildQuery(guildId, currentUser.id));
  const { theme } = useTheme();

  const guild = data as Guild;

  if (isMobile) {
    return (
      <Column className="relative size-full flex-1">
        <ChatDrawer>
          <ChatHeader>
            <ChatDrawerTrigger>
              <Icons.Hamburger className="size-5" />
            </ChatDrawerTrigger>

            <Icons.TextChannelHash className="mr-2 text-channel-icon" />

            <Drawer.Title>{channel?.name}</Drawer.Title>
          </ChatHeader>

          <ChatMessages guild={guild} channel={channel} channelId={channel.id} />

          <ChatInput channel={channel} />
        </ChatDrawer>
      </Column>
    );
  }

  return (
    <Column className={cn('relative size-full flex-1 pr-0', theme === 'terminal' && 'p-4')}>
      <ChatHeader>
        <Icons.TextChannelHash className="mr-2 text-channel-icon" />

        {channel.name}
      </ChatHeader>

      <ChatMessages guild={guild} channel={channel} channelId={channel.id} />

      <ChatInput channel={channel} />
    </Column>
  );
};
