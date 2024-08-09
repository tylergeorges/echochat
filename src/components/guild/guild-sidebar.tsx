'use client';

import type { PartialGuild } from '@/lib/db/schema';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useChannelsQuery } from '@/hooks/use-channels-query';

import { GuildChannel } from '@/components/guild/guild-channel';
import { Column, Row } from '@/components/flex';
import { Label } from '@/components/ui/label';
import { CreateChannelButton } from '@/components/create-channel-button';

interface GuildSidebarProps {
  guild: PartialGuild;
}

export const GuildSidebar = ({ guild }: GuildSidebarProps) => {
  const { data: channels } = useSuspenseQuery(useChannelsQuery(guild.id));

  return (
    <aside className="z-20 w-[240px] bg-background-secondary vertical">
      <div className="p-3 horizontal center-v">
        <h1 className="text-base font-semibold">{guild.name}</h1>
      </div>

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
