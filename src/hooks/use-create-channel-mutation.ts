import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { channelsQueryKey } from '@/hooks/use-channels-query';
import { insertChannel } from '@/lib/db/queries/channel';
import type { Channel, InsertChannel } from '@/lib/db/schema';

export const useCreateChannelMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (channel: InsertChannel) => insertChannel(channel);

  return useMutation({
    mutationFn,

    onMutate: async channel => {
      await queryClient.cancelQueries({ queryKey: channelsQueryKey });

      const prevChannels = queryClient.getQueryData<Channel[]>(channelsQueryKey) ?? [];

      queryClient.setQueryData(channelsQueryKey, () => [...prevChannels, channel]);

      return { prevChannels };
    },

    // If the mutation fails, use the context we returned above
    onError: (err, _, context) => {
      queryClient.setQueryData(channelsQueryKey, context?.prevChannels);

      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: channelsQueryKey });
    }
  });
};
