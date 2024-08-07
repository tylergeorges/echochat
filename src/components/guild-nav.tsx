import { guildsForMember } from '@/lib/db/queries/guild';
import type { User } from '@/lib/db/schema';

import { CreateServerButton } from '@/components/create-server-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { GuildNavButton } from '@/components/guild-nav-button';

interface GuildsProps {
  user: User | null;
}

export const GuildNav = async ({ user }: GuildsProps) => {
  const guilds = !user ? [] : await guildsForMember(user.id);

  return (
    <aside className="z-30 hidden h-full w-[72px] flex-col space-y-2 bg-background-tertiary py-3 center-h md:flex">
      {user && (
        <>
          <CreateServerButton user={user} />

          <div className="flex h-full flex-col items-center space-y-2 text-primary">
            {guilds.map(guild => (
              <GuildNavButton key={guild.id} guild={guild} />
            ))}
          </div>

          <Avatar size="xl">
            <AvatarImage src={user.avatarUrl} alt={`${user.username}'s avatar.`} />
          </Avatar>
        </>
      )}
    </aside>
  );
};
