import type { Message } from "@/lib/db/queries/message";
import { cn } from "@/lib/utils";

import { Column } from "@/components/flex";

interface ChatMessageProps extends Message {}

export const ChatMessage = ({
	author,
	content,
	createdAt,
	state,
}: ChatMessageProps) => (
	<div className='horizontal gap-2 p-4'>
		<img
			src={author.avatarUrl}
			className="aspect-square size-10 rounded-full"
		/>

		<Column className="">
			<div className='horizontal center-v gap-2'>
				<h1 className="font-semibold text-interactive-active">
					{author.username}
				</h1>
				<p className='text-interactive-muted text-sm'>
					{createdAt.toLocaleString()}
				</p>
			</div>

			<div
				className={cn(
					"whitespace-pre-wrap text-wrap break-all text-sm",
					"text-foreground",
					state === "sending" && "text-foreground/50",
					state === "error" && "text-destructive",
				)}
			>
				{content}
			</div>
		</Column>
	</div>
);
