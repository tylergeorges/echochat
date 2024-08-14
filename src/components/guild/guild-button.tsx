'use client';

import { useRouter } from 'next/navigation';

import { useAppRouter } from '@/hooks/use-app-router';
import type { Guild } from '@/lib/db/schema/guilds';
import { getGuildIcon } from '@/lib/get-bucket-asset';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface GuildButtonProps {
  guild: Guild;
}

export const GuildButton = ({ guild }: GuildButtonProps) => {
  const router = useRouter();
  const { guildId } = useAppRouter();

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    router.push(`/channels/${guild.id}/${guild.defaultChannelId}`);
  };

  const isActive = guildId === guild.id;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative mx-3 flex  size-12 overflow-hidden bg-background text-primary transition-all ',
        isActive ? 'rounded-md' : 'rounded-[50%] group-hover:rounded-[16px]'
      )}
    >
      <Avatar className={'size-full rounded-none'}>
        {guild.icon ? (
          <AvatarImage alt={`${guild.name}'s icon.`} src={getGuildIcon(guild.icon)} />
        ) : (
          <AvatarFallback />
        )}
      </Avatar>
    </button>
  );
};
