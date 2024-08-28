'use client';

import { useQueryClient } from '@tanstack/react-query';

import type { Channel } from '@/lib/db/schema/channels';
import { createClient } from '@/lib/supabase/client';

import { messagesQueryKey } from '@/hooks/use-messages-query';
import { useSendMessageMutation } from '@/hooks/use-send-message-mutation';
import type { Message } from '@/lib/db/queries/message';

interface ChatInputProps {
  channel: Channel;
}

export const ChatInput = ({ channel }: ChatInputProps) => {
  const sendMessageMutation = useSendMessageMutation(channel.id);
  const queryClient = useQueryClient();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const inputElement = target[0] as HTMLInputElement;

    const content = inputElement.value?.trim() as string;

    if (!content) return;

    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (!data || !data.user) return;

    const { user } = data;

    inputElement.value = '';

    const message: Message = {
      channelId: channel.id,
      content,
      id: crypto.randomUUID(),
      author: {
        avatarUrl: user.user_metadata.avatar_url,
        id: user.id,
        username: user.user_metadata.name
      },
      createdAt: new Date()
    };

    sendMessageMutation.mutate(message, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: messagesQueryKey
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: messagesQueryKey
        });
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full px-4 pb-5">
      <div className="">
        <input
          type="text"
          className="h-10 w-full rounded-md bg-input px-2.5 outline-none ring-0"
          placeholder={`Message #${channel.name}`}
        />
      </div>
    </form>
  );
};
