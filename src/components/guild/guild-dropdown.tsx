'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type { Guild } from '@/lib/db/queries/guild';
import { Modal, modal } from '@/lib/modal/system';
import { useLeaveGuildMutation } from '@/hooks/use-leave-guild-mutation';
import { getUser } from '@/lib/supabase/get-user';
import { guildsQueryKey } from '@/hooks/use-guilds-query';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { InviteModal } from '@/components/modals/invite-modal';
import { DeleteGuildModal } from '@/components/modals/delete-guild-modal';

interface GuildDropdownProps {
  guild: Guild;
}

export const GuildDropdown = ({ guild }: GuildDropdownProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const leaveGuildMutation = useLeaveGuildMutation(guild.id);

  const openInviteModal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!open || !guild) return;

    setOpen(false);

    modal(
      closeModal => <InviteModal inviteCode={guild.inviteCode} closeModal={closeModal} />,
      Modal.InviteModal
    );
  };

  const openLeaveGuildModal = async () => {
    const user = await getUser();

    if (!user) return;

    leaveGuildMutation.mutate(user.id, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: guildsQueryKey
        });

        router.push('/');
      }
    });
  };

  const openDeleteGuildModal = async () => {
    modal(
      closeModal => <DeleteGuildModal closeModal={closeModal} guild={guild} />,
      Modal.DeleteGuildModal
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="h-12 justify-between overflow-hidden p-3 px-4 outline-none transition horizontal center-v hover:bg-interactive-hover/10">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-left font-semibold">
          {guild.name}
        </h1>

        <Icons.DownArrow className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[220px] gap-2 p-1.5 vertical" side="top">
        <DropdownMenuGroup className="space-y-0.5 p-0">
          <Button
            variant="ghost"
            fill
            className="group justify-between px-2 text-primary-foreground transition-none"
            onClick={openInviteModal}
          >
            Invite People
            <Icons.AddPeople className="group size-4 transition-transform group-hover:-rotate-6" />
          </Button>

          <Button variant="ghost" fill className="group justify-between px-2 transition-none">
            Guild Settings
            <Icons.Settings className="size-4" />
          </Button>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-0" />

        <Button
          variant="ghost"
          color="destructive"
          fill
          className="justify-between px-2 transition-none"
          onClick={guild.isOwner ? openDeleteGuildModal : openLeaveGuildModal}
        >
          {guild.isOwner ? 'Delete Guild' : 'Leave Guild'}

          {guild.isOwner ? <Icons.Trash className="size-4" /> : <Icons.Logout className="size-4" />}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
