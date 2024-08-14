'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import type { User } from '@/lib/db/schema';

import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Column } from '@/components/flex';

interface ChatProps {
  channelId: string;
  guildId: string;
  currentUser: User;
}

export const Chat = ({ channelId, guildId, currentUser }: ChatProps) => {
  const { data: channel } = useSuspenseQuery(useChannelQuery(channelId));
  const { data: guild } = useQuery(useGuildQuery(guildId, currentUser.id));

  if (!channel || !guild) return null;

  return (
    <Column className="relative size-full flex-1">
      <ChatHeader channel={channel} />

      <Column className="flex-1 justify-end overflow-hidden">
        <ChatMessages guild={guild} channel={channel} channelId={channel.id} />
        <ChatInput channel={channel} />
      </Column>
    </Column>
  );
};
