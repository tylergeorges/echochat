'use server';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { useMessagesQuery } from '@/hooks/use-messages-query';
import { useChannelQuery } from '@/hooks/use-channel-query';

import { ChannelContainer } from '@/components/channel-container';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(useChannelQuery(params.channelId)),
    queryClient.prefetchQuery(useMessagesQuery(params.channelId))
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative z-0 flex-1 horizontal">
        <ChannelContainer channelId={params.channelId} />
      </main>
    </HydrationBoundary>
  );
}
