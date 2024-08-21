import type { Message } from '@/lib/db/queries/message';
import { formatTimestamp } from '@/lib/format-timestamp';
import { cn } from '@/lib/utils';

import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps extends Message {
  isOwner: boolean;
}

export const ChatMessage = ({ author, isOwner, content, createdAt, state }: ChatMessageProps) => {
  const formattedTimestamp = formatTimestamp(createdAt);

  return (
    <div className="gap-2 p-4 horizontal">
      <Avatar size="lg" className="shrink-0">
        <AvatarImage src={author.avatarUrl} alt={`${author.username}'s avatar.`} />
      </Avatar>

      <Column>
        <div className="gap-2 horizontal center-v">
          <h1 className="font-semibold text-interactive-active">{author.username}</h1>
          {isOwner && <Icons.Crown className="size-3.5 text-[#F0B132]" />}

          <p className="text-sm text-interactive-normal/60">{formattedTimestamp}</p>
        </div>

        <div
          className={cn(
            'whitespace-pre-wrap text-wrap break-words text-sm',
            'text-foreground',
            state === 'sending' && 'text-foreground/50',
            state === 'error' && 'text-destructive'
          )}
        >
          {content}
        </div>
      </Column>
    </div>
  );
};
