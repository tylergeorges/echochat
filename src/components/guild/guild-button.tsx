'use client';

import { useRouter } from 'next/navigation';

import { useAppRouter } from '@/hooks/use-app-router';
import type { Guild } from '@/lib/db/queries/guild';
import { getGuildIcon } from '@/lib/get-bucket-asset';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ActionTooltip } from '@/components/ui/action-tooltip';

interface GuildButtonProps {
  guild: Guild;
}

export const GuildButton = ({ guild }: GuildButtonProps) => {
  const router = useRouter();
  const { guildId } = useAppRouter();

  const isActive = guildId === guild.id;

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isActive) return;

    router.push(`/channels/${guild.id}/${guild.defaultChannelId}`);
  };

  return (
    <ActionTooltip label={guild.name} align="center" side="right">
      <div className="group relative mb-2 w-full horizontal center">
        <div
          className={cn(
            'ease group absolute left-0 h-[8px] w-[4px] rounded-r-full bg-foreground transition-all duration-300',
            isActive ? 'h-[40px]' : 'group-hover:h-[20px]'
          )}
        />
        <button
          type="button"
          onClick={onClick}
          className={cn('group flex size-12 bg-background text-primary')}
        >
          <Avatar
            className={cn(
              'group pointer-events-none size-full select-none transition-all duration-300',
              isActive ? 'rounded-2xl' : 'rounded-[50%] group-hover:rounded-[16px]'
            )}
          >
            {guild.icon ? (
              <AvatarImage alt={`${guild.name}'s icon.`} src={getGuildIcon(guild.icon)} />
            ) : (
              <AvatarFallback />
            )}
          </Avatar>
        </button>
      </div>
    </ActionTooltip>
  );
};
