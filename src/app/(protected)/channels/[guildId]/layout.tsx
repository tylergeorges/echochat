'use server';

import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getUser } from '@/lib/supabase/get-user';
import { getGuildInfo } from '@/lib/db/queries/guild';
import { getQueryClient } from '@/lib/get-query-client';
import { useChannelsQuery } from '@/hooks/use-channels-query';

import { Guilds } from '@/components/guild/guilds';
import { GuildSidebar } from '@/components/guild/guild-sidebar';

export default async function GuildLayout({
  params,
  children
}: LayoutProps<{ guildId: string; channelId?: string }>) {
  const queryClient = getQueryClient();

  const user = await getUser();

  if (!user) redirect('/login');

  const data = await getGuildInfo(params.guildId, user.id ?? '');

  if (!data) {
    redirect('/');
  }

  queryClient.prefetchQuery(useChannelsQuery(params.guildId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative z-0 flex-1 horizontal">
        <Guilds user={user} />
        <GuildSidebar guild={data.guild} />

        {children}
      </main>
    </HydrationBoundary>
  );
}
