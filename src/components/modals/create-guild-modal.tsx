import { useState } from "react";

import { insertGuild } from "@/lib/db/queries/guild";
import type { User } from "@/lib/db/schema/users";

import { useSupabase } from "@/hooks/use-supabase";

import { Icons } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadArea } from "@/components/upload-area";
import { generateSnowflake } from "@/lib/snowflake";
import { toast } from "sonner";

interface CreateGuildModalProps {
	user: User;
	closeModal: () => void;
}

export const CreateGuildModal = ({
	user,
	closeModal,
}: CreateGuildModalProps) => {
	const [dataURL, setDataURL] = useState<string | null>(null);
	const [guildIconFile, setGuildIconFile] = useState<File | null>(null);

	const supabase = useSupabase();

	const createGuild = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const target = e.target as HTMLFormElement;
		const inputElement = target[1] as HTMLInputElement;

		const guildName = inputElement.value as string;

		if (!guildName.trim() || !user || !dataURL || !guildIconFile) return;

		const iconSnowflake = generateSnowflake();
		const imageExt = guildIconFile.type.split("/")[1];

		const { data, error } = await supabase.storage
			.from("guild_icons")
			.upload(`${iconSnowflake}.${imageExt}`, guildIconFile);

		if (!data || error) {
			if (error) {
				toast.error(error.message);
			} else {
				toast.error("Error uploading guild icon. Try again");
			}

			return;
		}

		await insertGuild({
			name: guildName,
			ownerId: user.id,
			icon: data.fullPath,
		});

		closeModal();
	};

	const handleImageUpload = (file: File) => {
		const reader = new FileReader();

		if (!file.type.includes("image")) return;

		setGuildIconFile(file);
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			if (typeof reader.result !== "string") return;

			setDataURL(reader.result);
		};
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Customize Your Guild</DialogTitle>

				<DialogDescription>
					Give your new guild a personality with a name and an icon. You can
					always change it later.
				</DialogDescription>
			</DialogHeader>

			<form
				onSubmit={createGuild}
				className='vertical w-full flex-1 space-y-1.5'
				id="create-guild-form"
			>
				<DialogBody>
					<div className='center vertical w-full flex-1'>
						<UploadArea onUpload={handleImageUpload}>
							{dataURL ? (
								<Avatar className="size-[80px]">
									<AvatarImage alt="Guild Icon" src={dataURL} />
								</Avatar>
							) : (
								<>
									<Icons.Attachment />

									<Button>Choose File</Button>
								</>
							)}
						</UploadArea>
					</div>

					<div className="w-full flex-1 space-y-2">
						<Label htmlFor="guild-name" className="uppercase">
							guild name
						</Label>
						<Input
							id="guild-name"
							autoFocus
							color="form"
							className="w-full"
							defaultValue={`${user.username}'s guild`}
						/>
					</div>
				</DialogBody>

				<DialogFooter>
					<Button className="w-full" type="submit">
						Create
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
};
