'use client';

import { useEffect } from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import type { Channel, SelectMessage } from '@/lib/db/schema';
import { Message, transformBaseMessage } from '@/lib/db/queries/message';

import { messagesQueryKey, useMessagesQuery } from '@/hooks/use-messages-query';
import { useSupabase } from '@/hooks/use-supabase';

import { Column } from '@/components/flex';
import { ChatWelcome } from '@/components/chat/chat-welcome';
import { ChatMessage } from '@/components/chat/chat-message';

interface ChatMessagesProps {
  channelId: string;
  channel: Channel;
}

export const ChatMessages = ({ channelId, channel }: ChatMessagesProps) => {
  const { data: messages } = useSuspenseQuery(useMessagesQuery(channelId));
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

          // const prevMessages = queryClient.getQueryData<Message[]>(queryKey) ?? [];

          queryClient.setQueriesData<Message[]>({ queryKey }, oldMessages => {
            const update = (msg: Message) =>
              msg.id === transformed.id ? { ...msg, ...transformed } : msg;

            // return Array.isArray(oldMessages) ? oldMessages.map(update) : update(oldMessages);

            // return update(oldMessages)

            console.log('oldMessages ', oldMessages);

            return [...oldMessages, transformed].map(update);
            // return oldMessages.map(update);
            // return Array.isArray(oldMessages) ? oldMessages.map(update) : update(oldMessages)
          });
          // queryClient.setQueryData<Message[]>(queryKey, () => [...prevMessages, transformed]);

          console.log(payload, transformed);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient, channelId]);

  return (
    <Column className="flex-1 overflow-auto">
      <Column className="mb-4 h-full justify-end p-4">
        <ChatWelcome channelName={channelName} />

        <div className="flex-1">
          {messages?.map(message => (
            <ChatMessage
              key={message.id}
              author={message.author}
              channelId={message.channelId}
              content={message.content}
              createdAt={message.createdAt}
              id={message.id}
              state={message.state}
            />
          ))}
        </div>
      </Column>
    </Column>
  );
};
