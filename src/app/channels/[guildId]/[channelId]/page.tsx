'use server';

import { ChannelContainer } from '@/components/channel-container';
import { getChannelInfo } from '@/lib/db/queries/channel';
import { selectMessagesForChannel } from '@/lib/db/queries/message';

export default async function ChannelPage({
  params
}: PageProps<{ channelId: string; guildId: string }>) {
  const [channel] = await getChannelInfo(params.channelId);
  const messages = await selectMessagesForChannel(params.channelId);

  return (
    <main className="relative z-0 flex-1 horizontal">
      <ChannelContainer messages={messages} channel={channel} />
    </main>
  );
}
