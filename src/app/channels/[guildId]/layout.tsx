'use server';

import { getUser } from '@/lib/supabase/get-user';
import { getGuildInfo } from '@/lib/db/queries/guild';

import { GuildNav } from '@/components/guild-nav';
import { ChannelNav } from '@/components/channel-nav';

export default async function GuildLayout({ params, children }: LayoutProps<{ guildId: string }>) {
  const user = await getUser();

  const [guild] = await getGuildInfo(params.guildId, user?.id ?? '');

  return (
    <main className="relative z-0 flex-1 horizontal">
      <GuildNav user={user} />;
      <ChannelNav guild={guild} />
      {children}
    </main>
  );
}
