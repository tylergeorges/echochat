import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { selectChannelsForGuild } from '@/lib/db/queries/channel';
import type { Channel } from '@/lib/db/schema/channels';

export const channelsQueryKey = ['channels'];

export const useChannelsQuery = (
  guildId: string,
  queryOptions?: UseQueryOptions<Channel[], Error, Channel[], QueryKey>
) => {
  const queryFn = async (): Promise<Channel[]> => {
    const channels = await selectChannelsForGuild(guildId);

    return channels || [];
  };

  return { queryKey: [...channelsQueryKey, guildId], queryFn, ...queryOptions };
};
