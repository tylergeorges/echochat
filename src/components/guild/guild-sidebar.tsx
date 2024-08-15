'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import type { Guild } from '@/lib/db/queries/guild';
import { modal } from '@/lib/modal/system';

import { CreateChannelButton } from '@/components/create-channel-button';
import { Column, Row } from '@/components/flex';
import { GuildChannel } from '@/components/guild/guild-channel';
import { Icons } from '@/components/icons';
import { InviteModal } from '@/components/modals/invite-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

interface GuildSidebarProps {
  // guild: Guild;
  guildId: string;
  userId: string;
}

export const GuildSidebar = ({ guildId, userId }: GuildSidebarProps) => {
  const { data: channels } = useQuery(useChannelsQuery(guildId));
  const { data: guild } = useQuery(useGuildQuery(guildId, userId));

  const [open, setOpen] = useState(false);

  const openInviteModal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!open || !guild) return;

    setOpen(false);

    modal(closeModal => <InviteModal inviteCode={guild.inviteCode} closeModal={closeModal} />);
  };

  if (!guild) return null;

  return (
    <aside className="my-6 mb-0 w-full md:rounded-xl  rounded-tl-xl  bg-background-secondary rounded-b-none  vertical md:mb-6 md:w-[240px]">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="h-12 justify-between overflow-hidden p-3 outline-none transition horizontal center-v hover:bg-interactive-hover/10">
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
              className="group justify-between px-2 text-[#949CF7] transition-none"
              onClick={openInviteModal}
            >
              Invite People
              <Icons.AddPeople className="group size-4 transition-transform group-hover:-rotate-6" />
            </Button>

            <Button variant="ghost" fill className="group justify-between px-2 transition-none">
              Guild Settings
              <Icons.Settings className="group size-4 transition-transform duration-700 group-hover:rotate-180" />
            </Button>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-0" />

          <Button
            variant="ghost"
            color="destructive"
            fill
            className="justify-between px-2 transition-none"
          >
            Delete Guild
            <Icons.Trash className="size-4" />
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Column className="gap-2 px-3 pt-5 font-medium">
        <Row className="justify-between center-v">
          <Label className="text-channel-icon">Text Channels</Label>

          <CreateChannelButton guild={guild} />
        </Row>

        {channels?.map(ch => <GuildChannel channel={ch} key={ch.id} />)}
      </Column>
    </aside>
  );
};
