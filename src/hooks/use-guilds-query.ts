import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';

import { type Guild, guildsForMember } from '@/lib/db/queries/guild';

export const guildsQueryKey = ['guilds'];

export interface GuildsData {
  guild: Guild;
}

export const useGuildsQuery = (
  memberId: string,
  queryOptions?: UseQueryOptions<GuildsData[], Error, GuildsData[], QueryKey>
) => {
  const queryFn = async (): Promise<GuildsData[]> => {
    const guilds = await guildsForMember(memberId);

    return guilds;
  };

  return {
    queryKey: guildsQueryKey,
    queryFn,
    ...queryOptions
  };
};
