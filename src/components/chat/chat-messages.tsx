'use client';

import { type QueryKey, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { type ItemContent, Virtuoso } from 'react-virtuoso';

import { type Message, selectMessagesForChannel } from '@/lib/db/queries/message';
import type { Channel } from '@/lib/db/schema/channels';

import {
  type MessageListContext,
  components
} from '@/components/chat/chat-messages-list-components';
import { useMessageSubscription } from '@/hooks/use-message-subscription';
import { messagesQueryKey, useMessagesQuery } from '@/hooks/use-messages-query';
import type { Guild } from '@/lib/db/queries/guild';

import { ChatMessage } from '@/components/chat/chat-message';
import { Column } from '@/components/flex';

const START_INDEX = 999_999;

interface ChatMessagesProps {
  channelId: string;
  guild: Guild;
  channel: Channel;
}

export const ChatMessages = ({ channelId, channel, guild }: ChatMessagesProps) => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const messagesKeyCache = useRef<QueryKey>([...messagesQueryKey, page, channelId]);
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);

  const {
    data: messages,
    isFetching,
    isPending
  } = useSuspenseQuery({
    ...useMessagesQuery(channelId, page),
    queryFn: async () => {
      const messages = await selectMessagesForChannel(channelId, page);

      setFirstItemIndex(prev => prev - messages.length);

      if (page > 0) {
        const newerMessages = queryClient.getQueryData<Message[]>(messagesKeyCache.current) ?? [];

        messagesKeyCache.current = [...messagesQueryKey, page, channelId];
        return [...messages, ...newerMessages];
      }

      messagesKeyCache.current = [...messagesQueryKey, page, channelId];

      return messages ?? [];
    }
  });

  const channelName = `#${channel.name}`;

  useMessageSubscription(channelId);

  const renderItem: ItemContent<Message, MessageListContext> = (_, message) => (
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

  const startReached = () => {
    if (isFetching || isPending) return;

    setPage(prevPage => prevPage + 1);
  };

  return (
    <Column className="relative flex-1">
      <Virtuoso
        alignToBottom
        context={{ channelName }}
        components={components}
        startReached={startReached}
        data={messages}
        itemContent={renderItem}
        initialTopMostItemIndex={messages.length - 1}
        followOutput={isAtBottom => (isAtBottom ? 'auto' : false)}
        firstItemIndex={Math.max(0, firstItemIndex)}
        className="thin-scrollbar flex-1"
      />
    </Column>
  );
};
