'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { messagesQueryKey } from '@/hooks/use-messages-query';
import { useSupabase } from '@/hooks/use-supabase';
import { type Message, transformBaseMessage } from '@/lib/db/queries/message';
import type { SelectMessage } from '@/lib/db/schema';

export const useMessageSubscription = (channelId: string) => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

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
};
