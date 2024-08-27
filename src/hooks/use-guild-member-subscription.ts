'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useSupabase } from '@/hooks/use-supabase';
import { GuildsData, guildsQueryKey } from '@/hooks/use-guilds-query';
import { useAppRouter } from '@/hooks/use-app-router';
import { useRouter } from 'next/navigation';

export const useGuildMemberSubscription = (memberId: string) => {
  const supabase = useSupabase();
  const { guildId } = useAppRouter();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const queryKey = guildsQueryKey;

    const guildMemberChannel = supabase
      .channel('realtime guild_members')
      .on<{ guild_id: string; member_id: string }>(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'guild_members',
          filter: `member_id=eq.${memberId}`
        },
        async payload => {
          const deletedGuildMember = payload.old;

          const queriedGuilds = queryClient.getQueryData<GuildsData[]>(queryKey) ?? [];

          if (queriedGuilds.length) {
            queryClient.setQueryData<GuildsData[]>(
              queryKey,

              () => {
                return queriedGuilds.filter(data => data.guild.id !== deletedGuildMember.guild_id);
              }
            );

            queryClient.invalidateQueries({ queryKey });

            if (guildId && deletedGuildMember.guild_id === guildId) {
              router.push('/');
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(guildMemberChannel);
    };
  }, [supabase, queryClient]);
};
