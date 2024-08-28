import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { Guild } from '@/lib/db/queries/guild';
import { getUser } from '@/lib/supabase/get-user';
import { guildsQueryKey } from '@/hooks/use-guilds-query';
import { useLeaveGuildMutation } from '@/hooks/use-leave-guild-mutation';

import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface LeaveGuildModalProps {
  guild: Guild;
  closeModal: () => void;
}

export const LeaveGuildModal = ({ guild, closeModal }: LeaveGuildModalProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const leaveGuildMutation = useLeaveGuildMutation(guild.id);

  const leaveGuild = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user = await getUser();

    if (!user) return;

    leaveGuildMutation.mutate(user.id, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: guildsQueryKey
        });

        closeModal();

        router.prefetch('/');
        router.push('/');
      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader className="mb-0">
        <DialogTitle>Leave '{guild.name}'</DialogTitle>
      </DialogHeader>

      <DialogBody className="text-left text-sm">
        Are you sure you want to leave <strong>{guild.name}</strong>? You won't be able to rejoin
        this server unless you are re-invited.
      </DialogBody>

      <DialogFooter className="items-end justify-end">
        <Button variant="link" onClick={closeModal}>
          Cancel
        </Button>

        <Button color="destructive" onClick={leaveGuild}>
          Leave Guild
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
