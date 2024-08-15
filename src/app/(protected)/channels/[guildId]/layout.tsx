'use server';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import { useGuildsQuery } from '@/hooks/use-guilds-query';
import { getQueryClient } from '@/lib/get-query-client';
import { getUser } from '@/lib/supabase/get-user';

import { GuildSidebar } from '@/components/guild/guild-sidebar';
import { Guilds } from '@/components/guild/guilds';

export default async function GuildLayout({
  params,
  children
}: LayoutProps<{ guildId: string; channelId?: string }>) {
  const queryClient = new QueryClient();

  const user = await getUser();

  if (!user) redirect('/login');

  const guild = await queryClient.fetchQuery(useGuildQuery(params.guildId, user.id));

  if (!guild) {
    redirect('/');
  }

  await Promise.all([
    queryClient.prefetchQuery(useChannelsQuery(params.guildId)),
    queryClient.prefetchQuery(useGuildsQuery(user.id))
  ]);

  return (
    <main className="relative size-full flex-1 horizontal">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Guilds user={user} />
        <GuildSidebar guildId={params.guildId} userId={user.id} />

        {children}
      </HydrationBoundary>
    </main>
  );
}
