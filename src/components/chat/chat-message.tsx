import type { Message } from '@/lib/db/queries/message';
import { formatTimestamp } from '@/lib/format-timestamp';
import { cn } from '@/lib/utils';

import { ChatAuthorPopover } from '@/components/chat/chat-author-popover';
import { Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { ActionTooltip } from '@/components/ui/action-tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps extends Message {
  isOwner: boolean;
}

export const ChatMessage = ({ author, isOwner, content, createdAt, state }: ChatMessageProps) => {
  const formattedTimestamp = formatTimestamp(createdAt);

  return (
    <div className={'w-full flex-1 gap-2 p-4 pl-[72px] pr-[48px]'}>
      <ChatAuthorPopover asChild author={author} isOwner={isOwner}>
        <Avatar size="lg" className="absolute left-4 shrink-0 cursor-pointer">
          <AvatarImage src={author.avatarUrl} alt={`${author.username}'s avatar.`} />
        </Avatar>
      </ChatAuthorPopover>

      <Row className="gap-2">
        <ChatAuthorPopover author={author} isOwner={isOwner}>
          <Row className="inline gap-2 center">
            <span className="inline font-semibold leading-5 text-interactive-active hover:underline">
              {author.username}
            </span>

            {isOwner && (
              <ActionTooltip label="Guild Owner" align="center">
                <span>
                  <Icons.Crown className="size-3.5 text-[#F0B132]" />
                </span>
              </ActionTooltip>
            )}
          </Row>
        </ChatAuthorPopover>

        <span className="inline-block h-5 leading-5 text-interactive-normal/60">
          <time
            className="h-5 text-xs leading-5"
            aria-label={formattedTimestamp}
            dateTime={createdAt.toISOString()}
          >
            {formattedTimestamp}
          </time>
        </span>
      </Row>

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
