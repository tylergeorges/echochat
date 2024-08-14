"use server";

import { cache } from "react";

import { insertUser, userById } from "@/lib/db/queries/user";
import type { User } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";

export const getAuthUser = async () => {
	const supabase = createClient();

	const res = await supabase.auth.getUser();

	return res;
};

export const getUser = cache(async (): Promise<User | null> => {
	const { data } = await getAuthUser();

	if (!data || !data.user) return null;

	const [user] = await userById(data.user.id);

	const authUser = data.user;

	if (!user) {
		const [newUser] = await insertUser({
			avatarUrl: authUser.user_metadata.avatar_url,
			id: authUser.id,
			username: authUser.user_metadata.name,
		});

		return newUser;
	}

	return user as User;
});
