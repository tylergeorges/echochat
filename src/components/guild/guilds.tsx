'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useGuildMemberSubscription } from '@/hooks/use-guild-member-subscription';
import { useGuildsQuery } from '@/hooks/use-guilds-query';
import type { User } from '@/lib/db/schema/users';
import { cn } from '@/lib/utils';

import { CreateGuildButton } from '@/components/create-guild-button';
import { GuildButton } from '@/components/guild/guild-button';
import { TerminalLabel } from '@/components/ui/label';

interface GuildsProps {
  user: User;
}

export const Guilds = ({ user }: GuildsProps) => {
  const { data: guilds } = useSuspenseQuery(useGuildsQuery(user.id));

  useGuildMemberSubscription(user.id);

  return (
    <aside
      className={cn(
        'relative mb-0 mt-6 flex w-[72px] flex-col space-y-2 bg-background-tertiary center-h md:mb-0',

        'terminal:mx-4 terminal:my-4 terminal:rounded-none terminal:border-2 terminal:bg-transparent terminal:pt-4 terminal:md:my-4'
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

      {<TerminalLabel>nav</TerminalLabel>}
    </aside>
  );
};
