import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { getChannelInfo } from '@/lib/db/queries/channel';
import { Channel } from '@/lib/db/schema';

export const channelQueryKey = ['channel'];

export const useChannelQuery = (
  channelId: string,
  queryOptions?: UseQueryOptions<Channel, Error, Channel, QueryKey>
) => {
  const queryFn = async () => {
    const [channel] = await getChannelInfo(channelId);

    return channel;
  };

  return { queryKey: [...channelQueryKey, channelId], queryFn, ...queryOptions };
};
