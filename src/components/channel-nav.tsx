import { ChannelLink } from '@/components/channel-link';
import { Column } from '@/components/flex';
import { Label } from '@/components/ui/label';
import { selectChannelsForGuild } from '@/lib/db/queries/channel';
import type { PartialGuild } from '@/lib/db/schema';

interface ChannelNavProps {
  guild: PartialGuild;
}

export const ChannelNav = async ({ guild }: ChannelNavProps) => {
  const channels = await selectChannelsForGuild(guild.id);

  return (
    <aside className="z-20 w-[240px] bg-background-secondary vertical">
      <div className="p-3 horizontal center-v">
        <h1 className="text-base font-semibold">{guild.name}</h1>
      </div>

      <Column className="gap-2 px-3 pt-5 font-medium">
        <Label className="">Text Channels</Label>

        {channels.map(ch => (
          <ChannelLink channel={ch} key={ch.id} />
        ))}
      </Column>
    </aside>
  );
};
