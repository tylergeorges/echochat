'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useGuildMemberSubscription } from '@/hooks/use-guild-member-subscription';
import { useGuildsQuery } from '@/hooks/use-guilds-query';
import type { User } from '@/lib/db/schema/users';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

import { CreateGuildButton } from '@/components/create-guild-button';
import { GuildButton } from '@/components/guild/guild-button';
import { TerminalLabel } from '@/components/ui/label';

interface GuildsProps {
  user: User;
}

export const Guilds = ({ user }: GuildsProps) => {
  const { data: guilds } = useSuspenseQuery(useGuildsQuery(user.id));
  const { theme } = useTheme();

  useGuildMemberSubscription(user.id);

  return (
    <aside
      className={cn(
        'relative mb-0 mt-6 flex w-[72px] flex-col space-y-2 center-h md:mb-0',

        theme === 'terminal'
          ? 'mx-4 my-4 rounded-none border-2 bg-transparent pt-4 md:my-4'
          : 'bg-background-tertiary'
      )}
    >
      {user && (
        <>
          <div className="flex h-full w-full flex-col items-center text-primary">
            {guilds.map(({ guild }) => (
              <GuildButton key={guild.id} guild={guild} />
            ))}

            <div className="mt-2 h-1 w-1/2 rounded-full bg-background-secondary" />

            <CreateGuildButton user={user} />
          </div>
        </>
      )}

      {theme === 'terminal' && <TerminalLabel>nav</TerminalLabel>}
    </aside>
  );
};
