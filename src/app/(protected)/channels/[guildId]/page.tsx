"use server";

import { redirect } from "next/navigation";

import { getGuildInfo } from "@/lib/db/queries/guild";
import { getUser } from "@/lib/supabase/get-user";

export default async function GuildPage({
	params,
}: PageProps<{ guildId: string }>) {
	const user = await getUser();

	if (!user) redirect("/login");

	const data = await getGuildInfo(params.guildId, user.id);

	if (!data) redirect("/");

	const { guild } = data;

	if (guild) {
		redirect(`/channels/${params.guildId}/${guild.defaultChannelId}`);
	}

	return (
		<div className="flex size-full flex-1 center">
			<div className="max-w-lg">
				<h1 className="font text-xl font-medium">
					Click a channel on the left{" "}
				</h1>
			</div>
		</div>
	);
}
