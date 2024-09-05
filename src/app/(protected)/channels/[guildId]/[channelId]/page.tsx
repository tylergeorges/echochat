'use server';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import { useGuildsQuery } from '@/hooks/use-guilds-query';
import { useMessagesQuery } from '@/hooks/use-messages-query';
import { getUser } from '@/lib/supabase/get-user';

import { Chat } from '@/components/chat';
import { GuildSidebar } from '@/components/guild/guild-sidebar';
import { Guilds } from '@/components/guild/guilds';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  });
  const user = await getUser();

  if (!user) redirect('/login');

  const guild = await queryClient.fetchQuery(useGuildQuery(params.guildId, user.id));

  if (!guild) {
    redirect('/');
  }

  await Promise.all([
    queryClient.prefetchQuery(useChannelsQuery(params.guildId)),
    queryClient.prefetchQuery(useGuildsQuery(user.id)),
    queryClient.prefetchQuery(useChannelQuery(params.channelId)),
    queryClient.prefetchQuery(useMessagesQuery(params.channelId, 0))
  ]);

  return (
    <main className="relative size-full flex-1 horizontal">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Guilds user={user} />
        <GuildSidebar guildId={params.guildId} user={user} />
        <Chat currentUser={user} guildId={params.guildId} channelId={params.channelId} />
      </HydrationBoundary>
    </main>
  );
}
