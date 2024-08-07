'use server';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getUser } from '@/lib/supabase/get-user';
import { getGuildInfo } from '@/lib/db/queries/guild';

import { GuildNav } from '@/components/guild-nav';
import { ChannelNav } from '@/components/channel-nav';
import { useChannelsQuery } from '@/hooks/use-channels-query';

export default async function GuildLayout({ params, children }: LayoutProps<{ guildId: string }>) {
  const queryClient = new QueryClient();

  const user = await getUser();

  const [guild] = await getGuildInfo(params.guildId, user?.id ?? '');

  await queryClient.prefetchQuery(useChannelsQuery(params.guildId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative z-0 flex-1 horizontal">
        <GuildNav user={user} />
        <ChannelNav guild={guild} />
        {children}
      </main>
    </HydrationBoundary>
  );
}
