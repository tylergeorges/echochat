import { redirect } from "next/navigation";

import { getUser } from "@/lib/supabase/get-user";

import { AuthForm } from "@/components/auth-form";
import { Column } from "@/components/flex";

export default async function LoginPage() {
	const user = await getUser();

	if (user) return redirect("/");

	return (
		<Column className='horizontal center-h h-full w-full p-8 py-8'>
			<Column className='center vertical h-full w-full gap-3 space-y-6 sm:max-w-xs'>
				<div>
					<h1 className='m-0 font-bold text-2xl'>Welcome</h1>
				</div>
				<AuthForm />
			</Column>
		</Column>
	);
}
