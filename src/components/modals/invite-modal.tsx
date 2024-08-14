import { toast } from "sonner";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { getBaseUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
	DialogBody,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteModalProps {
	inviteCode: string;
	// eslint-disable-next-line react/no-unused-prop-types
	closeModal: () => void;
}

export const InviteModal = ({ inviteCode }: InviteModalProps) => {
	const [copiedText, copy] = useCopyToClipboard();

	const baseUrl = getBaseUrl();

	const inviteLink = `${baseUrl}/invite/${inviteCode}`;

	const copyLink = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		copy(inviteLink)
			.then(() => {
				toast.success("Copied invite!");
			})
			.catch((err) => {
				if (err instanceof Error) {
					toast.error("Failed to copy!", { description: err.message });
				}
			});
	};

	const inputMouseDown = async (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();

		const target = e.target as HTMLInputElement | undefined;

		if (!target) return;

		target.select();
	};

	return (
		<DialogContent className="w-full">
			<DialogHeader>
				<DialogTitle>Invite Friends</DialogTitle>
			</DialogHeader>

			<DialogBody className="w-full p-10 pt-0 text-left vertical">
				<div className="w-full">
					<Label htmlFor="invite" className="text-left uppercase">
						guild invite link
					</Label>

					<div className="w-full horizontal">
						<Input
							readOnly
							value={inviteLink}
							onMouseDown={inputMouseDown}
							spellCheck={false}
							name="invite"
							color="form"
							className="w-full"
						/>
						<Button
							color={copiedText ? "success" : "default"}
							onClick={copyLink}
						>
							{copiedText ? "Copied!" : "Copy"}
						</Button>
					</div>
				</div>
			</DialogBody>
		</DialogContent>
	);
};
