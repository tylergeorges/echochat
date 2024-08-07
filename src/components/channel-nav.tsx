'use client';

import type { PartialGuild } from '@/lib/db/schema';
import { useQuery } from '@tanstack/react-query';

import { useChannelsQuery } from '@/hooks/use-channels-query';

import { ChannelLink } from '@/components/channel-link';
import { Column, Row } from '@/components/flex';
import { Label } from '@/components/ui/label';
import { CreateChannelButton } from '@/components/create-channel-button';

interface ChannelNavProps {
  guild: PartialGuild;
}

export const ChannelNav = ({ guild }: ChannelNavProps) => {
  const { data: channels } = useQuery(useChannelsQuery(guild.id));

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

        {channels?.map(ch => <ChannelLink channel={ch} key={ch.id} />)}
      </Column>
    </aside>
  );
};
