import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { messagesQueryKey } from '@/hooks/use-messages-query';
import { type Message, insertMessage } from '@/lib/db/queries/message';

export const useSendMessageMutation = (channelId: string) => {
  const queryClient = useQueryClient();

  const mutationFn = async (message: Message) =>
    insertMessage({
      authorId: message.author.id,
      channelId: message.channelId,
      content: message.content
    });

  const queryKey = [...messagesQueryKey, channelId];

  return useMutation({
    mutationFn,

    onMutate: async msg => {
      await queryClient.cancelQueries({ queryKey });

      const prevMessages = queryClient.getQueryData<Message[]>(queryKey) ?? [];

      queryClient.setQueryData(queryKey, () => [...prevMessages, { ...msg, state: 'sending' }]);

      return { prevMessages };
    },

    // If the mutation fails, use the context we returned above
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(queryKey, [
        ...(context?.prevMessages ?? []),
        { ...newMessage, state: 'error' }
      ]);

      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
};
