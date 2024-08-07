'use client';

import Link from 'next/link';

import type { Channel } from '@/lib/db/schema';
import { useAppRouter } from '@/hooks/use-app-router';
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';

interface ChannelLinkProps {
  channel: Channel;
}

export const ChannelLink = ({ channel }: ChannelLinkProps) => {
  const { channelId } = useAppRouter();

  const isActive = channelId === channel.id;

  return (
    <Link
      className={cn(
        'w-full justify-start gap-2 rounded-md px-2 py-1.5 font-medium transition horizontal center-v',
        isActive
          ? 'bg-modifier-selected text-interactive-hover'
          : 'text-channel-icon hover:bg-modifier-hover hover:text-interactive-normal active:bg-modifier-active'
      )}
      href={`/channels/${channel.guildId}/${channel.id}`}
    >
      <Icons.TextChannelHash className="size-5" />

      <h2>{channel.name}</h2>
    </Link>
  );
};
