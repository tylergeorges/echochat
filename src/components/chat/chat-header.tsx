import type { Channel } from '@/lib/db/schema';

import { Icons } from '@/components/icons';

interface ChatHeaderProps {
  channel: Channel;
}

export const ChatHeader = ({ channel }: ChatHeaderProps) => (
  <header className="text-md flex h-12 items-center border-b border-foreground/15 px-3 font-semibold">
    <Icons.TextChannelHash className="mr-2 text-channel-icon" />

    {channel.name}
  </header>
);
