'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useChannelQuery } from '@/hooks/use-channel-query';

import { Column } from '@/components/flex';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';

interface ChatProps {
  channelId: string;
}

export const Chat = ({ channelId }: ChatProps) => {
  const { data: channel } = useSuspenseQuery(useChannelQuery(channelId));

  if (!channel) return null;

  return (
    <Column className="relative size-full flex-1">
      <ChatHeader channel={channel} />

      <Column className="flex-1 justify-end overflow-hidden">
        {/* <Column className="flex-1 overflow-auto">
          <Column className="mb-4 h-full justify-end p-4">
            <div className="size-min rounded-full bg-interactive-muted/50 p-2">
              <Icons.TextChannelHash className="size-12 text-interactive-active" />
            </div>

            <Column>
              <h1 className="text-3xl font-bold">Welcome to {channelName}</h1>
              <p className="text-sm text-channel-icon">
                This is the start of the {channelName} channel.
              </p>
            </Column>
          </Column>

          <ChatMessages channelId={channel.id} />
        </Column> */}

        <ChatMessages channel={channel} channelId={channel.id} />
        <ChatInput channel={channel} />
      </Column>
    </Column>
  );
};
