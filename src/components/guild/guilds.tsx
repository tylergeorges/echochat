'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useGuildsQuery } from '@/hooks/use-guilds-query';
import type { User } from '@/lib/db/schema/users';

import { CreateGuildButton } from '@/components/create-guild-button';
import { GuildButton } from '@/components/guild/guild-button';
import { UserButton } from '@/components/user-button';

interface GuildsProps {
  user: User | null;
}

export const Guilds = ({ user }: GuildsProps) => {
  const { data: guilds } = useSuspenseQuery(useGuildsQuery(user?.id ?? ''));

  return (
    <aside className="relative z-0 flex h-full w-[72px] flex-col space-y-2 overflow-y-auto bg-background-tertiary py-3 center-h">
      {user && (
        <>
          <CreateGuildButton user={user} />

          <div className="relative flex h-full w-full flex-col items-center space-y-2 text-primary">
            {guilds.map(({ guild }) => (
              <GuildButton key={guild.id} guild={guild} />
            ))}
          </div>
        </>
      )}

      <UserButton user={user} />
    </aside>
  );
};
