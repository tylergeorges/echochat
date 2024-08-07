'use client';

import { useQuery } from '@tanstack/react-query';

import { useMessagesQuery } from '@/hooks/use-messages-query';

import { Column } from '@/components/flex';
import { cn } from '@/lib/utils';

interface MessagesListProps {
  channelId: string;
}

export const MessagesList = ({ channelId }: MessagesListProps) => {
  const { data: messages } = useQuery(useMessagesQuery(channelId));

  return (
    <div className="flex-1">
      {messages?.map(message => (
        <div className="gap-2 p-4 horizontal" key={message.id}>
          <img src={message.author.avatarUrl} className="aspect-square size-10 rounded-full" />

          <Column className="">
            <div className="gap-2 horizontal center-v">
              <h1 className="font-semibold text-interactive-active">{message.author.username}</h1>
              <p className="text-sm text-interactive-muted">{message.createdAt.toLocaleString()}</p>
            </div>

            <div
              className={cn(
                'whitespace-pre-wrap text-wrap break-all text-sm',
                'text-foreground',
                message?.state === 'sending' && 'text-foreground/50',
                message?.state === 'error' && 'text-red-500'
              )}
            >
              {message.content}
            </div>
          </Column>
        </div>
      ))}
    </div>
  );
};
