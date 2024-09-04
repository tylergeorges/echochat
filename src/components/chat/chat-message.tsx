import type { Message } from '@/lib/db/queries/message';
import { formatTimestamp } from '@/lib/format-timestamp';
import { cn } from '@/lib/utils';

import { Column, Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { ActionTooltip } from '@/components/ui/action-tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { UserAvatar } from '@/components/user-avatar';
import { PopoverTrigger } from '@radix-ui/react-popover';

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
        <Popover>
          <PopoverTrigger>
            <h1 className="font-semibold text-interactive-active hover:underline">
              {author.username}
            </h1>
          </PopoverTrigger>

          <PopoverContent
            align="center"
            side="right"
            className="w-[300px] gap-2 px-4 pb-3 vertical"
          >
            <div className="pt-8">
              <UserAvatar user={author} size="3xl" className="m-0" />
            </div>

            <Column className="">
              <Row className="gap-2 center-v">
                <h1 className="text-[20px] font-bold leading-5">{author.username}</h1>

                {isOwner && (
                  <ActionTooltip label="Guild Owner" align="center">
                    <Icons.Crown className="size-4 text-[#F0B132]" />
                  </ActionTooltip>
                )}
              </Row>
            </Column>
          </PopoverContent>
        </Popover>

        {isOwner && (
          <ActionTooltip label="Guild Owner" align="center">
            <Icons.Crown className="size-3.5 text-[#F0B132]" />
          </ActionTooltip>
        )}

        <p className="text-sm text-interactive-normal/60 hover:underline">{formattedTimestamp}</p>
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
