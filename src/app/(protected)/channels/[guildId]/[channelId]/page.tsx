'use server';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { useChannelQuery } from '@/hooks/use-channel-query';
import { useMessagesQuery } from '@/hooks/use-messages-query';
import { getQueryClient } from '@/lib/get-query-client';

import { Chat } from '@/components/chat';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(useChannelQuery(params.channelId));
  queryClient.prefetchQuery(useMessagesQuery(params.channelId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="horizontal relative z-0 flex-1">
        <Chat channelId={params.channelId} />
      </main>
    </HydrationBoundary>
  );
}
