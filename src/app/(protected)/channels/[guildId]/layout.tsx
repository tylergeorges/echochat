"use server";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { useChannelsQuery } from "@/hooks/use-channels-query";
import { getGuildInfo } from "@/lib/db/queries/guild";
import { getQueryClient } from "@/lib/get-query-client";
import { getUser } from "@/lib/supabase/get-user";

import { GuildSidebar } from "@/components/guild/guild-sidebar";
import { Guilds } from "@/components/guild/guilds";

export default async function GuildLayout({
	params,
	children,
}: LayoutProps<{ guildId: string; channelId?: string }>) {
	const queryClient = getQueryClient();

	const user = await getUser();

	if (!user) redirect("/login");

	const data = await getGuildInfo(params.guildId, user.id ?? "");

	if (!data) {
		redirect("/");
	}

	queryClient.prefetchQuery(useChannelsQuery(params.guildId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<main className='horizontal relative z-0 flex-1'>
				<Guilds user={user} />
				<GuildSidebar guild={data.guild} />

				{children}
			</main>
		</HydrationBoundary>
	);
}
