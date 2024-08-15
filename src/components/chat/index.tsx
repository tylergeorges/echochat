'use client';

import { useQuery } from '@tanstack/react-query';

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
  const isMobile = useMediaQuery('screen and (max-width: 768px)');

  const { data: channel } = useQuery(useChannelQuery(channelId));
  const { data: guild } = useQuery(useGuildQuery(guildId, currentUser.id));

  if (!channel || !guild) return;

  if (isMobile) {
    return (
      <ChatDrawer>
        <Column className="relative size-full flex-1">
          <ChatHeader>
            <ChatDrawerTrigger>
              <Icons.Hamburger className="mr-6 size-5" />
            </ChatDrawerTrigger>

            <Icons.TextChannelHash className="mr-2 text-channel-icon" />
            {channel.name}
          </ChatHeader>

          <Column className="h-full flex-1 justify-end">
            <ChatMessages guild={guild} channel={channel} channelId={channel.id} />
            <ChatInput channel={channel} />
          </Column>
        </Column>
      </ChatDrawer>
    );
  }

  return (
    <Column className="relative my-6 flex-1">
      <ChatHeader>
        <Icons.TextChannelHash className="mr-2 text-channel-icon" />
        {channel.name}
      </ChatHeader>

      <Column className="h-full flex-1 justify-end">
        <ChatMessages guild={guild} channel={channel} channelId={channel.id} />
        <ChatInput channel={channel} />
      </Column>
    </Column>
  );
};
