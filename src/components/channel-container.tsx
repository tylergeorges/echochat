import type { Message } from '@/lib/db/queries/message';
import type { Channel } from '@/lib/db/schema';

import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';
import { MessageForm } from '@/components/message-form';
import { MessagesList } from '@/components/messages-list';

interface ChannelContainerProps {
  channel: Channel;
}

export const ChannelContainer = ({ channel }: ChannelContainerProps) => {
  const channelName = `#${channel.name}`;

  return (
    <Column className="relative size-full flex-1">
      <header className="text-md flex h-12 items-center border-b border-foreground/15 px-3 font-semibold">
        <Icons.TextChannelHash className="mr-2 text-channel-icon" />
        {channel.name}
      </header>

      <Column className="flex-1 justify-end overflow-hidden">
        <Column className="flex-1 overflow-auto">
          <Column className="mb-4 justify-end p-4">
            <div className="size-min flex-1 rounded-full bg-interactive-muted/50 p-2">
              <Icons.TextChannelHash className="size-12 text-interactive-active" />
            </div>

            <Column>
              <h1 className="text-3xl font-bold">Welcome to {channelName}</h1>
              <p className="text-sm text-channel-icon">
                This is the start of the {channelName} channel.
              </p>
            </Column>
          </Column>

          <MessagesList channelId={channel.id} />
        </Column>

        <MessageForm channel={channel} />
      </Column>
    </Column>
  );
};
