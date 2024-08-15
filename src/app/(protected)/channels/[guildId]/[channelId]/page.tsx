'use server';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useMessagesQuery } from '@/hooks/use-messages-query';
import { getQueryClient } from '@/lib/get-query-client';
import { getUser } from '@/lib/supabase/get-user';

import { Chat } from '@/components/chat';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const queryClient = new QueryClient();
  const user = await getUser();

  if (!user) redirect('/');

  await Promise.all([
    queryClient.prefetchQuery(useChannelQuery(params.channelId)),
    queryClient.prefetchQuery(useMessagesQuery(params.channelId))
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat currentUser={user} guildId={params.guildId} channelId={params.channelId} />
    </HydrationBoundary>
  );
}
