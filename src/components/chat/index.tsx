'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { User } from '@/lib/db/schema';

import { ChatDrawer, ChatDrawerTrigger } from '@/components/chat/chat-drawer';
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
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { data: channel } = useSuspenseQuery(useChannelQuery(channelId));
  const { data: guild } = useSuspenseQuery(useGuildQuery(guildId, currentUser.id));

  if (isMobile) {
    return (
      <Column className="relative size-full flex-1">
        <ChatDrawer>
          <ChatHeader>
            <ChatDrawerTrigger>
              <Icons.Hamburger className="size-5" />
            </ChatDrawerTrigger>

            <Icons.TextChannelHash className="mr-2 text-channel-icon" />
            {channel?.name}
          </ChatHeader>

          <ChatMessages guild={guild} channel={channel} channelId={channel.id} />
          <ChatInput channel={channel} />
        </ChatDrawer>
      </Column>
    );
  }

  return (
    <Column className="relative size-full flex-1 p-4 py-6">
      <ChatHeader>
        <Icons.TextChannelHash className="mr-2 text-channel-icon" />
        {channel.name}
      </ChatHeader>

      <ChatMessages guild={guild} channel={channel} channelId={channel.id} />
      <ChatInput channel={channel} />
    </Column>
  );
};
