import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { type Message, type PageCursor, selectMessagesForChannel } from '@/lib/db/queries/message';

export const messagesQueryKey = ['messages'];

export const useMessagesQuery = (
  channelId: string,
  // page = 1,
  // cursor?: PageCursor,
  queryOptions?: UseQueryOptions<Message[], Error, Message[], QueryKey>
) => {
  const queryFn = async (): Promise<Message[]> => {
    const messages = await selectMessagesForChannel(channelId, );

    return messages ?? [];
  };

  return {
    queryKey: [...messagesQueryKey, channelId, ],
    queryFn,
    ...queryOptions
  };
};
