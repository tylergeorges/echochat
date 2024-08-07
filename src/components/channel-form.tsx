import type { PartialGuild } from '@/lib/db/schema';

import { useCreateChannelMutation } from '@/hooks/use-create-channel-mutation';
import { getAuthUser } from '@/lib/supabase/get-user';
import { channelsQueryKey } from '@/hooks/use-channels-query';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQueryClient } from '@tanstack/react-query';
import { Icons } from '@/components/icons';

interface ChannelFormProps {
  guild: PartialGuild;
  closeModal: () => void;
}

export const ChannelForm = ({ guild, closeModal }: ChannelFormProps) => {
  const createChannelMutation = useCreateChannelMutation();
  const queryClient = useQueryClient();

  const createChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const inputElement = target[0] as HTMLInputElement;

    const channelName = inputElement.value?.trim() as string;

    if (!channelName) return;

    const { data: userData } = await getAuthUser();

    if (!userData || !userData.user) return;

    closeModal();

    createChannelMutation.mutate(
      {
        guildId: guild.id,
        name: channelName
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: channelsQueryKey
          });
        },

        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: channelsQueryKey
          });
        }
      }
    );
  };

  return (
    <Card className="max-w-lg border-none bg-card vertical">
      <form
        onSubmit={createChannel}
        className="w-full flex-1 space-y-2 vertical"
        id="create-server-form"
      >
        <CardHeader className="pointer-events-none select-none mb-8 p-4 pt-8 text-center vertical sm:text-left">
          <CardTitle className="text-center">Create Channel</CardTitle>

          <CardDescription className="text-center">
            Channels are where your members communicate.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-4 center vertical">
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
                className="p-2.5 pl-8"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="w-full px-4 py-4 center">
          <Button className="w-full" type="submit">
            Create Channel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
