'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getUser } from '@/lib/supabase/get-user';
import { getGuildInfo } from '@/lib/db/queries/guild';

import { Guilds } from '@/components/guild/guilds';
import { GuildSidebar } from '@/components/guild/guild-sidebar';
import { useChannelsQuery } from '@/hooks/use-channels-query';
import { getQueryClient } from '@/lib/get-query-client';

export default async function GuildLayout({ params, children }: LayoutProps<{ guildId: string }>) {
  const queryClient = getQueryClient();
  // const queryClient = new QueryClient();

  const user = await getUser();

  const [guild] = await getGuildInfo(params.guildId, user?.id ?? '');

  queryClient.prefetchQuery(useChannelsQuery(params.guildId));
  // await queryClient.prefetchQuery(useChannelsQuery(params.guildId));

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
