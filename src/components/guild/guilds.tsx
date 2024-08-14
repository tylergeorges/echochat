import { guildsForMember } from "@/lib/db/queries/guild";
import type { User } from "@/lib/db/schema/users";

import { CreateGuildButton } from "@/components/create-guild-button";
import { GuildButton } from "@/components/guild/guild-button";
import { UserButton } from "@/components/user-button";

interface GuildsProps {
	user: User | null;
}

export const Guilds = async ({ user }: GuildsProps) => {
	const guilds = !user ? [] : await guildsForMember(user.id);

	return (
		<aside className="z-30 hidden h-full w-[72px] flex-col space-y-2 bg-background-tertiary py-3 center-h md:flex">
			{user && (
				<>
					<CreateGuildButton user={user} />

					<div className="flex h-full flex-col items-center space-y-2 text-primary">
						{guilds.map(({ guild }) => (
							<GuildButton key={guild.id} guild={guild} />
						))}
					</div>
				</>
			)}

			<UserButton user={user} />
		</aside>
	);
};
