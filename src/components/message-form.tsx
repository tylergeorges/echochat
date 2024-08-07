'use client';

import { insertMessage } from '@/lib/db/queries/message';
import { Channel } from '@/lib/db/schema';
import { createClient } from '@/lib/supabase/client';

interface MessageFormProps {
  channel: Channel;
}

export const MessageForm = ({ channel }: MessageFormProps) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = e.target[0].value?.trim() as string;

    if (!content) return;

    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (!data || !data.user) return;

    const { user } = data;

    await insertMessage({ authorId: user.id, channelId: channel.id, content });
  };

  return (
    <form onSubmit={onSubmit} className="w-full p-4 pb-6">
      <input
        type="text"
        className="h-10 w-full rounded-md bg-input px-2.5 outline-none ring-0"
        placeholder={`Message #${channel.name}`}
      />

      <button type="submit" className="hidden" />
    </form>
  );
};
