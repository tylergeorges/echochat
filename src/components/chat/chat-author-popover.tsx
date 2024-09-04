import type { User } from '@/lib/db/schema';

import { Column, Row } from '@/components/flex';
import { Icons } from '@/components/icons';
import { ActionTooltip } from '@/components/ui/action-tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserAvatar } from '@/components/user-avatar';

interface ChatAuthorPopoverProps {
  author: User;
  isOwner?: boolean;
  asChild?: boolean;
}

export const ChatAuthorPopover = ({
  author,
  children,
  isOwner,
  asChild
}: React.PropsWithChildren<ChatAuthorPopoverProps>) => {
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>

      <PopoverContent align="start" side="right" className="w-[300px] gap-2 px-4 pb-3 vertical">
        <div className="pt-8">
          <UserAvatar user={author} size="3xl" className="m-0" />
        </div>

        <Column>
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
  );
};
