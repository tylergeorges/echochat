'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { guildsQueryKey } from '@/hooks/use-guilds-query';
import { type Guild, leaveGuild } from '@/lib/db/queries/guild';

export const useLeaveGuildMutation = (guildId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const queryKey = guildsQueryKey;

  return useMutation({
    mutationFn: async (memberId: string) => {
      return leaveGuild(guildId, memberId);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const prevGuilds = queryClient.getQueryData<{ guild: Guild }[]>(queryKey) ?? [];

      queryClient.setQueryData<{ guild: Guild }[]>(queryKey, guilds => {
        return (guilds ?? []).filter(data => data.guild.id !== guildId);
      });

      router.push('/');

      return { prevGuilds };
    },

    // If the mutation fails, use the context we returned above
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.prevGuilds);

      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
};
