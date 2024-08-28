import { useQueryClient } from '@tanstack/react-query';

import { channelsQueryKey } from '@/hooks/use-channels-query';
import { useCreateChannelMutation } from '@/hooks/use-create-channel-mutation';
import type { Guild } from '@/lib/db/queries/guild';
import { getAuthUser } from '@/lib/supabase/get-user';
import { generateUuid } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ChannelFormProps {
  guild: Guild;
  closeModal: () => void;
}

export const CreateChannelModal = ({ guild, closeModal }: ChannelFormProps) => {
  const createChannelMutation = useCreateChannelMutation(guild.id);
  const queryClient = useQueryClient();

  const channelsKey = [...channelsQueryKey, guild.id];

  const createChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const inputElement = target[0] as HTMLInputElement;

    const channelName = inputElement.value?.trim() as string;

    if (!channelName) return;

    const { data: userData } = await getAuthUser();

    if (!userData || !userData.user) return;

    
    closeModal()
    
    createChannelMutation.mutate(
      {
        guildId: guild.id,
        name: channelName,
        id: generateUuid()
      },
      
      {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: channelsKey
          });

          
        },

        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: channelsKey
          });
        }
      }
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Channel</DialogTitle>

        <DialogDescription>Channels are where your members communicate.</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={createChannel}
        className="w-full flex-1 space-y-2 vertical"
        id="create-server-form"
      >
        <DialogBody>
          <div className="w-full flex-1 space-y-2">
            <Label htmlFor="server-name" className="uppercase">
              Channel Name
            </Label>

            <div className="relative w-full horizontal center-v">
              <Icons.TextChannelHash className="absolute left-2 z-10 size-5 text-channel-icon" />
              <Input
                id="channel-name"
                autoFocus
                placeholder="Enter a channel name"
                color="form"
                className="p-3 pl-8"
              />
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button className="w-full" type="submit">
            Create Channel
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
