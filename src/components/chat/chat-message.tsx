import type { Message } from '@/lib/db/queries/message';
import { formatTimestamp } from '@/lib/format-timestamp';
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ActionTooltip } from '@/components/ui/action-tooltip';

interface ChatMessageProps extends Message {
  isOwner: boolean;
}

export const ChatMessage = ({ author, isOwner, content, createdAt, state }: ChatMessageProps) => {
  const formattedTimestamp = formatTimestamp(createdAt);

  return (
    <div className={cn('w-full flex-1 gap-2 p-4 pl-[72px] pr-[48px]')}>
      <Avatar size="lg" className="absolute left-4 shrink-0">
        <AvatarImage src={author.avatarUrl} alt={`${author.username}'s avatar.`} />
      </Avatar>

      <div className="gap-2 horizontal center-v">
        <h1 className="font-semibold text-interactive-active">{author.username}</h1>
        {isOwner && (
          <ActionTooltip label="Guild Owner" align="center">
            <Icons.Crown className="size-3.5 text-[#F0B132]" />
          </ActionTooltip>
        )}

        <p className="text-sm text-interactive-normal/60">{formattedTimestamp}</p>
      </div>

      <div
        className={cn(
          'ml-[-72px] whitespace-pre-wrap text-wrap break-words pl-[72px] text-sm',
          'text-foreground',
          state === 'sending' && 'text-foreground/50',
          state === 'error' && 'text-destructive'
        )}
      >
        {content}
      </div>
    </div>
  );
};
