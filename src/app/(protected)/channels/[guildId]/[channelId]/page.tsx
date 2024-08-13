'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { useMessagesQuery } from '@/hooks/use-messages-query';
import { useChannelQuery } from '@/hooks/use-channel-query';

import { Chat } from '@/components/chat';
import { getQueryClient } from '@/lib/get-query-client';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(useChannelQuery(params.channelId));
  queryClient.prefetchQuery(useMessagesQuery(params.channelId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative z-0 flex-1 horizontal">
        <Chat channelId={params.channelId} />
      </main>
    </HydrationBoundary>
  );
}
