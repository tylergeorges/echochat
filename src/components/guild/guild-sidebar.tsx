'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';

import { CreateChannelButton } from '@/components/create-channel-button';
import { Column, Row } from '@/components/flex';
import { GuildChannel } from '@/components/guild/guild-channel';
import type { User } from '@/lib/db/schema';
import { cn } from '@/lib/utils';

import { GuildDropdown } from '@/components/guild/guild-dropdown';
import { Label, TerminalLabel } from '@/components/ui/label';
import { UserFooter } from '@/components/user-footer';

interface GuildChannelsProps {
  guildId: string;
  userId: string;
}

export const GuildChannels = ({ guildId, userId }: GuildChannelsProps) => {
  const { data: guild } = useSuspenseQuery(useGuildQuery(guildId, userId));
  const { data: channels } = useSuspenseQuery(useChannelsQuery(guildId));

  if (!guild) return null;

  return (
    <Column className={cn('h-full terminal:border-2 terminal:px-2')}>
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
    </Column>
  );
};

interface GuildSidebarProps {
  guildId?: string;
  user: User;
}

export const GuildSidebar = ({ guildId, user }: GuildSidebarProps) => {
  return (
    <aside
      className={cn(
        'relative w-full rounded-b-none rounded-tl-xl bg-background-secondary vertical md:w-[240px] md:rounded-none',
        'terminal:mx-4 terminal:my-4 terminal:bg-transparent'
      )}
    >
      <TerminalLabel className="-top-4">guild</TerminalLabel>

      {guildId ? (
        <GuildChannels guildId={guildId} userId={user.id} />
      ) : (
        <aside className={cn('mb-4 flex-1 terminal:border-2')} />
      )}

      <UserFooter user={user} />
    </aside>
  );
};
