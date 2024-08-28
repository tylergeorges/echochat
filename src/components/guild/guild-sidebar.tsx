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
    <aside className="w-full rounded-b-none rounded-tl-xl bg-background-secondary vertical md:w-[240px] md:rounded-none">
      <GuildDropdown guild={guild} />

      <Column className="no-scrollbar gap-2 overflow-y-scroll pb-4 pt-5 font-medium">
        <Row className="justify-between pr-4 center-v">
          <Label className="px-2 pl-4 text-channel-icon">Text Channels</Label>

          {guild.ownerId === userId ? <CreateChannelButton guild={guild} /> : null}
        </Row>

        {channels?.map(ch => <GuildChannel channel={ch} key={ch.id} />)}
      </Column>
    </aside>
  );
};
