"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { Channel } from "@/lib/db/schema/channels";

import { useAppRouter } from "@/hooks/use-app-router";
import { channelQueryKey } from "@/hooks/use-channel-query";

export const useChannel = () => {
	const queryClient = useQueryClient();
	const { channelId } = useAppRouter();

	if (!channelId) throw new Error("Can only use in a channel");

	const channel = queryClient.getQueryData<Channel>([
		...channelQueryKey,
		channelId,
	]);

	if (!channel) throw new Error("Channel not set in cache.");

	return channel;
};
