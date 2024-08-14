import { Column } from "@/components/flex";
import { Icons } from "@/components/icons";

interface ChatWelcomeProps {
	channelName: string;
}

export const ChatWelcome = ({ channelName }: ChatWelcomeProps) => (
	<>
		<div className="size-min rounded-full bg-interactive-muted/50 p-2">
			<Icons.TextChannelHash className="size-12 text-interactive-active" />
		</div>

		<Column>
			<h1 className="text-3xl font-bold">Welcome to {channelName}</h1>
			<p className="text-sm text-channel-icon">
				This is the start of the {channelName} channel.
			</p>
		</Column>
	</>
);
