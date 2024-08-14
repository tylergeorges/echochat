import { getUser } from "@/lib/supabase/get-user";

import { Guilds } from "@/components/guild/guilds";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<main className='horizontal relative z-0 flex-1'>
			<Guilds user={user} />
		</main>
	);
}
