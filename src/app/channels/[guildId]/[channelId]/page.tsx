'use server';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getChannelInfo } from '@/lib/db/queries/channel';

import { ChannelContainer } from '@/components/channel-container';
import { useMessagesQuery } from '@/hooks/use-messages-query';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const queryClient = new QueryClient();

  const [channel] = await getChannelInfo(params.channelId);

  await queryClient.prefetchQuery(useMessagesQuery(params.channelId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative z-0 flex-1 horizontal">
        <ChannelContainer channel={channel} />
      </main>
    </HydrationBoundary>
  );
}
