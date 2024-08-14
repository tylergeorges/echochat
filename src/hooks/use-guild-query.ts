import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { type Guild, getGuildInfo } from '@/lib/db/queries/guild';

export const guildQueryKey = ['guild'];

export const useGuildQuery = (
  guildId: string,
  memberId: string,
  queryOptions?: UseQueryOptions<Guild, Error, Guild, QueryKey>
) => {
  const queryFn = async (): Promise<Guild> => {
    const data = await getGuildInfo(guildId, memberId);

    return data?.guild as Guild;
  };

  return {
    queryKey: [...guildQueryKey, guildId, memberId],
    queryFn,
    ...queryOptions
  };
};
