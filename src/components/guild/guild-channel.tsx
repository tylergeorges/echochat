'use client';

import Link from 'next/link';

import { useAppRouter } from '@/hooks/use-app-router';
import type { Channel } from '@/lib/db/schema/channels';
import { cn } from '@/lib/utils';
import { useDrawerStore } from '@/stores/drawer-store';

import { Icons } from '@/components/icons';

interface GuildChannelProps {
  channel: Channel;
}

export const GuildChannel = ({ channel }: GuildChannelProps) => {
  const { channelId } = useAppRouter();

  const { setIsOpen } = useDrawerStore();

  const isActive = channelId === channel.id;

  return (
    <div className='ml-2 '>

    <Link
      className={cn(
        'w-full justify-start gap-2 rounded-md  py-1.5 px-2 font-medium transition horizontal center-v',
        isActive
          ? 'bg-modifier-selected text-interactive-hover'
          : 'text-channel-icon hover:bg-modifier-hover hover:text-interactive-normal active:bg-modifier-active'
      )}
      onClick={() => {
        setIsOpen(true);
      }}
      href={`/channels/${channel.guildId}/${channel.id}`}
    >
      <Icons.TextChannelHash className="size-5" />

      <h2>{channel.name}</h2>
    </Link>
    </div>
  );
};
