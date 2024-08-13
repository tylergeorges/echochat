/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { useRouter } from 'next/navigation';

import type { Guild } from '@/lib/db/schema/guilds';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getGuildIcon } from '@/lib/get-bucket-asset';

interface GuildButtonProps {
  guild: Guild;
}

export const GuildButton = ({ guild }: GuildButtonProps) => {
  const router = useRouter();

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    router.push(`/channels/${guild.id}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mx-3 flex size-12 overflow-hidden rounded-[50%] bg-background text-primary transition-all group-hover:rounded-[16px]"
    >
      <Avatar className="size-full">
        {guild.icon ? (
          <AvatarImage alt={`${guild.name}'s icon.`} src={getGuildIcon(guild.icon)} />
        ) : (
          <AvatarFallback />
        )}
      </Avatar>
    </button>
  );
};
