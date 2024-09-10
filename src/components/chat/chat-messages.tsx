'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { type ItemContent, Virtuoso } from 'react-virtuoso';

import type { Message } from '@/lib/db/queries/message';
import type { Channel } from '@/lib/db/schema/channels';

import {
  type MessageListContext,
  components
} from '@/components/chat/chat-messages-list-components';
import { useMessageSubscription } from '@/hooks/use-message-subscription';
import { useMessagesQuery } from '@/hooks/use-messages-query';
import type { Guild } from '@/lib/db/queries/guild';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

import { ChatMessage } from '@/components/chat/chat-message';
import { Column } from '@/components/flex';
import { TerminalLabel } from '@/components/ui/label';

const START_INDEX = 999_999;

interface ChatMessagesProps {
  channelId: string;
  guild: Guild;
  channel: Channel;
}

export const ChatMessages = ({ channelId, channel, guild }: ChatMessagesProps) => {
  const [firstItemIndex] = useState(START_INDEX);

  const { theme } = useTheme();

  const { data: messages } = useSuspenseQuery(useMessagesQuery(channelId));

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

  return (
    <Column className={cn('relative flex-1', theme === 'terminal' && 'my-4 border-2')}>
      {theme === 'terminal' && <TerminalLabel className="-top-4">messages</TerminalLabel>}
      <Virtuoso
        alignToBottom
        context={{ channelName }}
        components={components}
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
