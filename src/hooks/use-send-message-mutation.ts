import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { insertMessage, Message } from '@/lib/db/queries/message';
import { messagesQueryKey } from '@/hooks/use-messages-query';

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (message: Message) =>
    insertMessage({
      authorId: message.author.id,
      channelId: message.channelId,
      content: message.content
    });

  return useMutation({
    mutationFn,

    onMutate: async msg => {
      await queryClient.cancelQueries({ queryKey: messagesQueryKey });

      const prevMessages = queryClient.getQueryData<Message[]>(messagesQueryKey) ?? [];

      queryClient.setQueryData(messagesQueryKey, () => [
        ...prevMessages,
        { ...msg, state: 'sending' }
      ]);

      return { prevMessages };
    },

    // If the mutation fails, use the context we returned above
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(messagesQueryKey, [
        ...(context?.prevMessages ?? []),
        { ...newMessage, state: 'error' }
      ]);

      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: messagesQueryKey });
    }
  });
};
