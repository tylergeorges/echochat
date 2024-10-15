'use client';

import type { Message } from '@/lib/db/queries/message';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { ChatAuthorPopover } from '@/components/chat/chat-author-popover';
import { Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { Timestamp } from '@/components/timestamp';
import { ActionTooltip } from '@/components/ui/action-tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps extends Message {
  isOwner: boolean;
}

export const ChatMessage = ({ author, isOwner, content, createdAt, state }: ChatMessageProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = () => {
    setIsMouseOver(true);
  };

  const onMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className={
        'relative w-full flex-1 gap-2 p-4 pl-[72px] pr-[48px] hover:bg-background-tertiary/20'
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ChatAuthorPopover asChild author={author} isOwner={isOwner}>
        <Avatar size="lg" className="absolute left-4 shrink-0 cursor-pointer">
          <AvatarImage src={author.avatarUrl} alt={`${author.username}'s avatar.`} />
        </Avatar>
      </ChatAuthorPopover>

      <Row className="w-full gap-2">
        <ChatAuthorPopover author={author} isOwner={isOwner}>
          <Row className="inline gap-2 center">
            <span className="inline font-semibold leading-5 text-foreground hover:underline">
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
          <Timestamp timestamp={createdAt} />
        </span>

        {isMouseOver && (
          <Row className="absolute right-0 top-0 center">
            <Row className="absolute -top-4 right-0 pl-8 pr-3.5 center">
              <Row className="relative min-h-8 rounded-lg bg-background-tertiary p-0.5 center-v">
                <ActionTooltip label="Delete Message" align="center">
                  <span className="p-0.5">
                    <Icons.Trash className="size-5 text-destructive" />
                  </span>
                </ActionTooltip>
              </Row>
            </Row>
          </Row>
        )}
      </Row>

      <div
        className={cn(
          'relative ml-[-72px] whitespace-pre-wrap text-wrap break-words pl-[72px] text-sm',
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
