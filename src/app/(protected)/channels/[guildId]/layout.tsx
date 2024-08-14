'use server';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { getQueryClient } from '@/lib/get-query-client';
import { getUser } from '@/lib/supabase/get-user';

import { GuildSidebar } from '@/components/guild/guild-sidebar';
import { Guilds } from '@/components/guild/guilds';
import { useGuildQuery } from '@/hooks/use-guild-query';

export default async function GuildLayout({
  params,
  children
}: LayoutProps<{ guildId: string; channelId?: string }>) {
  const queryClient = getQueryClient();

  const user = await getUser();

  if (!user) redirect('/login');

  const guild = await queryClient.fetchQuery(useGuildQuery(params.guildId, user.id ?? ''));
  // const data = await getGuildInfo(params.guildId, user.id ?? '');

  if (!guild) {
    redirect('/');
  }

  // queryClient.prefetchQuery(useGuildQuery(params.guildId, user.id));
  queryClient.prefetchQuery(useChannelsQuery(params.guildId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative z-0 flex-1 horizontal">
        <Guilds user={user} />
        <GuildSidebar guild={guild} />

        {children}
      </main>
    </HydrationBoundary>
  );
}
