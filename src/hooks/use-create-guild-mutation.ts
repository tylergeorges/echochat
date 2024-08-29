'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { guildsQueryKey } from '@/hooks/use-guilds-query';
import { type Guild, insertGuild } from '@/lib/db/queries/guild';

export const useCreateGuildMutation = () => {
  const queryClient = useQueryClient();

  const queryKey = guildsQueryKey;

  return useMutation({
    mutationFn: async ({
      icon,
      name,
      ownerId,
      id
    }: {
      name: string;
      ownerId: string;
      icon: string;
      id: string;
    }) => {
      return insertGuild({
        name: name,
        ownerId: ownerId,
        icon: icon,
        id
      });
    },

    onMutate: async guild => {
      await queryClient.cancelQueries({ queryKey });

      const prevGuilds = queryClient.getQueryData<{ guild: Guild }[]>(queryKey) ?? [];

      queryClient.setQueryData<{ guild: Guild }[]>(queryKey, guilds => {
        return [...(guilds ?? []), { guild }] as { guild: Guild }[];
      });

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
