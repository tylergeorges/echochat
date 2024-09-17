'use client';

import type { User } from '@/lib/db/schema/users';
import { cn } from '@/lib/utils';

import { ProfileDropdown } from '@/components/profile-dropdown';
import { TerminalLabel } from '@/components/ui/label';

interface UserFooterProps {
  user: User;
}

export const UserFooter = ({ user }: UserFooterProps) => {
  return (
    <div
      className={cn(
        'absolute bottom-0 h-[52px] w-full gap-1 bg-background-tertiary/50 px-2 transition horizontal center-v',
        'terminal:relative terminal:mt-4 terminal:border-2 terminal:bg-transparent'
      )}
    >
      <ProfileDropdown user={user} />

      <TerminalLabel className="-top-4">user</TerminalLabel>
    </div>
  );
};
