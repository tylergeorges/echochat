'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useGuildsQuery } from '@/hooks/use-guilds-query';
import type { User } from '@/lib/db/schema/users';

import { CreateGuildButton } from '@/components/create-guild-button';
import { GuildButton } from '@/components/guild/guild-button';
import { UserButton } from '@/components/user-button';

interface GuildsProps {
  user: User;
}

export const Guilds = ({ user }: GuildsProps) => {
  const { data: guilds } = useSuspenseQuery(useGuildsQuery(user.id));

  return (
    <aside className="z-0 mb-0 mt-6 flex w-[72px] flex-col space-y-2 overflow-y-auto center-h md:mb-6">
      {user && (
        <>
          <div className="relative flex h-full w-full flex-col items-center text-primary">
            {guilds.map(({ guild }) => (
              <GuildButton key={guild.id} guild={guild} />
            ))}

            <div className="mt-2 h-1 w-1/2 rounded-full bg-background-secondary" />

            <CreateGuildButton user={user} />
          </div>
        </>
      )}

      <UserButton user={user} />
    </aside>
  );
};
