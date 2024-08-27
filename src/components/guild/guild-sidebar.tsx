'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';

import { CreateChannelButton } from '@/components/create-channel-button';
import { Column, Row } from '@/components/flex';
import { GuildChannel } from '@/components/guild/guild-channel';

import { Label } from '@/components/ui/label';
import { GuildDropdown } from '@/components/guild/guild-dropdown';

interface GuildSidebarProps {
  guildId: string;
  userId: string;
}

export const GuildSidebar = ({ guildId, userId }: GuildSidebarProps) => {
  const { data: channels } = useSuspenseQuery(useChannelsQuery(guildId));
  const { data: guild } = useSuspenseQuery(useGuildQuery(guildId, userId));

  if (!guild) return null;

  return (
    <aside className="my-6 mb-0 w-full rounded-b-none rounded-tl-xl bg-background-secondary vertical md:mb-6 md:w-[240px] md:rounded-xl">
      <GuildDropdown guild={guild} />

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
