'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import type { Message } from '@/lib/db/queries/message';
import type { Channel } from '@/lib/db/schema/channels';

import { useMessagesQuery } from '@/hooks/use-messages-query';
import type { Guild } from '@/lib/db/queries/guild';

import { ChatMessage } from '@/components/chat/chat-message';
import { ChatWelcome } from '@/components/chat/chat-welcome';
import { Column } from '@/components/flex';
import { useMessageSubscription } from '@/hooks/use-message-subscription';

const START_INDEX = 999_999;

interface ChatMessagesProps {
  channelId: string;
  guild: Guild;
  channel: Channel;
}

export const ChatMessages = ({ channelId, channel, guild }: ChatMessagesProps) => {
  const { data: messages } = useSuspenseQuery(useMessagesQuery(channelId));

  const [firstItemIndex, _] = useState(START_INDEX - messages.length);

  const channelName = `#${channel.name}`;

  useMessageSubscription(channelId);

  const renderItem = (_: number, message: Message) => (
    <ChatMessage
      isOwner={message.author.id === guild.ownerId}
      author={message.author}
      channelId={message.channelId}
      content={message.content}
      createdAt={message.createdAt}
      id={message.id}
      state={message.state}
    />
  );

  return (
    <Column className="relative h-full">
      <Column className="flex-1 justify-end">
        <Virtuoso
          alignToBottom
          components={{ Header: () => <ChatWelcome channelName={channelName} /> }}
          data={messages}
          itemContent={renderItem}
          initialTopMostItemIndex={messages.length - 1}
          followOutput={isAtBottom => (isAtBottom ? 'auto' : false)}
          firstItemIndex={Math.max(0, firstItemIndex)}
          className="flex-1"
        />
      </Column>
    </Column>
  );
};
