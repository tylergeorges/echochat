'use client';

import { useRouter } from 'next/navigation';

import { useAppRouter } from '@/hooks/use-app-router';
import type { Guild } from '@/lib/db/queries/guild';
import { getGuildIcon } from '@/lib/get-bucket-asset';
import { cn } from '@/lib/utils';

import { ActionTooltip } from '@/components/ui/action-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

    const guildUrl = `/channels/${guild.id}/${guild.defaultChannelId}`;

    router.prefetch(guildUrl);
    router.push(guildUrl);
  };

  return (
    <ActionTooltip label={guild.name} align="center" side="right">
      <div className="group mb-2 w-full horizontal center">
        <div
          className={cn(
            'ease group absolute left-0 h-[8px] w-[4px] rounded-r-full bg-foreground transition-all duration-300',
            isActive ? 'h-[40px]' : 'group-hover:h-[20px]',
            'terminal:rounded-none terminal:hover:rounded-none'
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
              isActive ? 'rounded-2xl' : 'rounded-[50%] group-hover:rounded-[16px]',
              'terminal:rounded-none terminal:group-hover:rounded-none'
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
