'use client';

import type { Guild } from '@/lib/db/schema/guilds';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useChannelsQuery } from '@/hooks/use-channels-query';

import { GuildChannel } from '@/components/guild/guild-channel';
import { Column, Row } from '@/components/flex';
import { Label } from '@/components/ui/label';
import { CreateChannelButton } from '@/components/create-channel-button';
import { modal } from '@/lib/modal/system';
import { InviteModal } from '@/components/modals/invite-modal';

interface GuildSidebarProps {
  guild: Guild;
}

export const GuildSidebar = ({ guild }: GuildSidebarProps) => {
  const { data: channels } = useSuspenseQuery(useChannelsQuery(guild.id));

  const guildSettingsClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    modal(closeModal => <InviteModal inviteCode={guild.inviteCode} closeModal={closeModal} />);
  };
  return (
    <aside className="z-20 w-[240px] bg-background-secondary vertical">
      <button type='button' className="p-3 horizontal center-v" onClick={guildSettingsClick}>
        <h1 className="text-base font-semibold">{guild.name}</h1>
      </button>

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
