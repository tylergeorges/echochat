"use client";

import { useRouter } from "next/navigation";

import { useSupabase } from "@/hooks/use-supabase";
import type { User } from "@/lib/db/schema/users";

import { Icons } from "@/components/icons";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarVariants,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserAvatarProps {
	user: User;
	size: AvatarVariants["size"];
	className?: string;
}

const UserAvatar = ({ user, className, size }: UserAvatarProps) => (
	<Avatar size={size} className={className}>
		<AvatarImage src={user.avatarUrl} alt={`${user.username}'s avatar.`} />
	</Avatar>
);

interface UserButtonProps {
	user: User | null;
}

export const UserButton = ({ user }: UserButtonProps) => {
	const router = useRouter();
	const supabase = useSupabase();

	const logout = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		await supabase.auth.signOut();

		router.push("/");
		router.refresh();
	};

	const login = (e: React.SyntheticEvent) => {
		e.preventDefault();

		router.push("/login");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{user ? (
					<UserAvatar user={user} size="xl" />
				) : (
					<div>
						<Avatar size="xl">
							<AvatarFallback />
						</Avatar>
					</div>
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-[300px] gap-2 p-0 vertical"
				side="top"
				align="start"
				sideOffset={16}
			>
				{user ? (
					<>
						<div className="px-4 pt-8">
							<UserAvatar user={user} size="3xl" className="mx-2" />
						</div>

						<div className="px-4 pb-4">
							<DropdownMenuLabel className="text-xl">
								{user.username}
							</DropdownMenuLabel>

							<DropdownMenuGroup className="space-y-0.5 p-0">
								<Button
									variant="ghost"
									fill
									className="group justify-start pl-2 transition-none"
								>
									<Icons.Pencil className="group size-4 transition-transform group-hover:-rotate-6" />
									Edit Profile
								</Button>

								<Button
									variant="ghost"
									fill
									className="group justify-start px-2 transition-none"
								>
									<Icons.Settings className="group size-4 transition-transform duration-700 group-hover:rotate-180" />
									Settings
								</Button>
							</DropdownMenuGroup>

							<DropdownMenuSeparator />

							<Button
								variant="ghost"
								color="destructive"
								fill
								onClick={logout}
								className="group justify-start px-2 transition-none"
							>
								<Icons.Logout className="size-4" />
								Log out
							</Button>
						</div>
					</>
				) : (
					<>
						<Button
							variant="ghost"
							color="destructive"
							fill
							onClick={login}
							className="group justify-start px-2 transition-none"
						>
							<Icons.Logout className="size-4" />
							Login
						</Button>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
