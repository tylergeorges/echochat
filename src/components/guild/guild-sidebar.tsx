'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';

import { CreateChannelButton } from '@/components/create-channel-button';
import { Column, Row } from '@/components/flex';
import { GuildChannel } from '@/components/guild/guild-channel';

import { GuildDropdown } from '@/components/guild/guild-dropdown';
import { Label } from '@/components/ui/label';
import { UserFooter } from '@/components/user-footer';
import type { User } from '@/lib/db/schema';

interface GuildChannelsProps {
  guildId: string;
  userId: string;
}

export const GuildChannels = ({ guildId, userId }: GuildChannelsProps) => {
  const { data: guild } = useSuspenseQuery(useGuildQuery(guildId, userId));
  const { data: channels } = useSuspenseQuery(useChannelsQuery(guildId));

  if (!guild) return null;

  return (
    <>
      <GuildDropdown guild={guild} />

      {channels && (
        <Column className="no-scrollbar gap-2 overflow-y-scroll pb-4 pt-5 font-medium">
          <Row className="justify-between pr-4 center-v">
            <Label className="px-2 pl-4 text-channel-icon">Text Channels</Label>

            {guild.ownerId === userId ? <CreateChannelButton guild={guild} /> : null}
          </Row>

          {channels?.map(ch => <GuildChannel channel={ch} key={ch.id} />)}
        </Column>
      )}
    </>
  );
};

interface GuildSidebarProps {
  guildId?: string;
  user: User;
}

export const GuildSidebar = ({ guildId, user }: GuildSidebarProps) => {
  return (
    <aside className="relative w-full rounded-b-none rounded-tl-xl bg-background-secondary vertical md:w-[240px] md:rounded-none">
      {guildId && <GuildChannels guildId={guildId} userId={user.id} />}

      <UserFooter user={user} />
    </aside>
  );
};
