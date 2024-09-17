'use client';

import { useRouter } from 'next/navigation';

import { useSupabase } from '@/hooks/use-supabase';
import type { User } from '@/lib/db/schema/users';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user-avatar';
import { useTheme } from '@/providers/theme-provider';

interface ProfileDropdownProps {
  user: User;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const router = useRouter();
  const supabase = useSupabase();

  const { setTheme } = useTheme();

  const logout = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await supabase.auth.signOut();

    router.refresh();

    router.push('/login');
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-9 rounded-md pl-0.5 transition horizontal center-v hover:bg-interactive-hover/15 terminal:rounded-none"
        >
          <UserAvatar user={user} size="md" />

          <span className="mr-1 p-1 pl-2 text-sm font-semibold text-white">{user.username}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[300px] gap-2 p-0 vertical"
        side="top"
        align="start"
        alignOffset={-32}
      >
        <div className="px-4 pt-8">
          <UserAvatar user={user} size="3xl" className="mx-2" />
        </div>

        <div className="px-4 pb-4">
          <DropdownMenuLabel className="text-xl">{user.username}</DropdownMenuLabel>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger asChild>
              <Button
                variant="ghost"
                fill
                className="group justify-start rounded-lg px-2 transition-none terminal:rounded-none"
              >
                <Icons.Pencil className="size-4" />
                Theme
                <Icons.ChevronRight className="absolute right-0 size-4" />
              </Button>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Button
                  variant="ghost"
                  fill
                  onClick={e => {
                    e.preventDefault();

                    setTheme('default');
                  }}
                  className="group justify-start px-2 transition-none"
                >
                  Default
                </Button>
                <Button
                  variant="ghost"
                  fill
                  onClick={e => {
                    e.preventDefault();

                    setTheme('terminal');
                  }}
                  className="group justify-start px-2 transition-none"
                >
                  Terminal
                </Button>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <Button
            variant="ghost"
            color="destructive"
            fill
            onClick={logout}
            className="group justify-start px-2 transition-none"
          >
            <Icons.Logout className="size-4" />
            Log out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
