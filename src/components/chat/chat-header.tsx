import type { Channel } from '@/lib/db/schema/channels';

import { Icons } from '@/components/icons';

interface ChatHeaderProps {
  channel: Channel;
}

export const ChatHeader = ({ channel }: ChatHeaderProps) => (
  <header className="flex h-12 items-center border-foreground/15 border-b px-3 font-semibold text-md">
    <Icons.TextChannelHash className="mr-2 text-channel-icon" />

    {channel.name}
  </header>
);
