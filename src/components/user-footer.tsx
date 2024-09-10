'use client';

import type { User } from '@/lib/db/schema/users';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

import { ProfileDropdown } from '@/components/profile-dropdown';
import { TerminalLabel } from '@/components/ui/label';

interface UserFooterProps {
  user: User;
}

export const UserFooter = ({ user }: UserFooterProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'absolute bottom-0 h-[52px] w-full gap-1 bg-background-tertiary/50 px-2 transition horizontal center-v',
        theme === 'terminal' && 'relative mt-4 border-2 bg-transparent'
      )}
    >
      <ProfileDropdown user={user} />

      {theme === 'terminal' && <TerminalLabel className="-top-4">user</TerminalLabel>}
    </div>
  );
};
