import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { channelsQueryKey } from "@/hooks/use-channels-query";
import { insertChannel } from "@/lib/db/queries/channel";
import type { Channel, InsertChannel } from "@/lib/db/schema/channels";

export const useCreateChannelMutation = (guildId: string) => {
	const queryClient = useQueryClient();

	const mutationFn = async (channel: InsertChannel) => insertChannel(channel);

	const channelsKey = [...channelsQueryKey, guildId];

	return useMutation({
		mutationFn,

		onMutate: async (channel) => {
			await queryClient.cancelQueries({ queryKey: channelsKey });

			const prevChannels =
				queryClient.getQueryData<Channel[]>(channelsKey) ?? [];

			queryClient.setQueryData(channelsKey, () => [...prevChannels, channel]);

			return { prevChannels };
		},

		// If the mutation fails, use the context we returned above
		onError: (err, _, context) => {
			queryClient.setQueryData(channelsKey, context?.prevChannels);

			toast.error(err.message);
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: channelsKey });
		},
	});
};
