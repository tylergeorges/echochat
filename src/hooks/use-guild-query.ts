import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { type Guild, getGuildInfo } from '@/lib/db/queries/guild';

export const guildQueryKey = ['guild'];

export const useGuildQuery = (
  guildId: string,
  memberId: string,
  queryOptions?: UseQueryOptions<Guild | undefined, Error, Guild | undefined, QueryKey>
) => {
  const queryFn = async (): Promise<Guild | undefined> => {
    try {
      const data = await getGuildInfo(guildId, memberId);

      return data?.guild as Guild;
    } catch (err) {
      return;
    }
  };

  return {
    queryKey: [...guildQueryKey, guildId, memberId],
    queryFn,
    ...queryOptions
  };
};
