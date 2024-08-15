'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { type Message, transformBaseMessage } from '@/lib/db/queries/message';
import type { Channel } from '@/lib/db/schema/channels';
import type { SelectMessage } from '@/lib/db/schema/messages';

import { messagesQueryKey, useMessagesQuery } from '@/hooks/use-messages-query';
import { useSupabase } from '@/hooks/use-supabase';
import type { Guild } from '@/lib/db/queries/guild';

import { ChatMessage } from '@/components/chat/chat-message';
import { ChatWelcome } from '@/components/chat/chat-welcome';
import { Column } from '@/components/flex';

interface ChatMessagesProps {
  channelId: string;
  guild: Guild;
  channel: Channel;
}

export const ChatMessages = ({ channelId, channel, guild }: ChatMessagesProps) => {
  const { data: messages } = useQuery(useMessagesQuery(channelId));
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const channelName = `#${channel.name}`;

  useEffect(() => {
    const queryKey = [...messagesQueryKey, channelId];
    const channel = supabase
      .channel('realtime messages')
      .on<SelectMessage>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        async payload => {
          const newMessage = payload.new;

          const [transformed] = await transformBaseMessage(newMessage);

          const prevMessages = queryClient.getQueryData<Message[]>(queryKey) ?? [];

          if (prevMessages.findIndex(msg => msg.id === transformed.id) > -1) {
            queryClient.setQueryData(queryKey, (prev: Message[]) => {
              return prev.map(msg => {
                if (msg.id === transformed.id) return { ...msg, ...transformed };

                return msg;
              });
            });
          } else {
            queryClient.setQueryData(
              queryKey,

              (prev: Message[]) => [...prev, transformed]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient, channelId]);

  return (
    <Column className="relative h-full overflow-auto">
      <Column className="flex-1 justify-end">
        <ChatWelcome channelName={channelName} />

        {messages?.map(message => (
          <ChatMessage
            key={message.id}
            isOwner={message.author.id === guild.ownerId}
            author={message.author}
            channelId={message.channelId}
            content={message.content}
            createdAt={message.createdAt}
            id={message.id}
            state={message.state}
          />
        ))}
      </Column>
    </Column>
  );
};
