import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { Guild } from '@/lib/db/queries/guild';
import { getUser } from '@/lib/supabase/get-user';
import { useDeleteGuildMutation } from '@/hooks/use-delete-guild-mutation';
import { guildsQueryKey } from '@/hooks/use-guilds-query';

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

interface DeleteGuildModalProps {
  guild: Guild;
  closeModal: () => void;
}

export const DeleteGuildModal = ({ guild, closeModal }: DeleteGuildModalProps) => {
  const queryClient = useQueryClient();
  const guildNameInputRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState('');

  const deleteGuildMutation = useDeleteGuildMutation(guild.id);

  const deleteGuild = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const guildNameInput = guildNameInputRef.current;

    if (!guildNameInput) return;

    if (guildNameInput.value.toLowerCase() !== guild.name.toLowerCase()) {
      if (!formError) {
        setFormError("You didn't enter the server name correctly");
      }

      return;
    }

    const user = await getUser();

    if (!user || user.id !== guild.ownerId) return;

    deleteGuildMutation.mutate(user.id, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: guildsQueryKey
        });

        closeModal();
      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader className="mb-0">
        <DialogTitle>Delete '{guild.name}'</DialogTitle>

        <DialogDescription className="rounded-md bg-yellow-500 p-2.5 text-white">
          {'Are you sure you want to delete '} <strong>{guild.name}</strong>? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={deleteGuild}
        className="w-full flex-1 space-y-2 vertical"
        id="create-server-form"
      >
        <DialogBody className="">
          <div className="w-full flex-1 space-y-2">
            <Label htmlFor="guild-name" className="uppercase">
              enter guild name
            </Label>

            <Input
              id="guild-name"
              autoFocus
              color="form"
              className="w-full"
              ref={guildNameInputRef}
            />

            {formError && <span className="text-xs text-[#fa777c]">{formError}</span>}
          </div>
        </DialogBody>

        <DialogFooter className="items-end justify-end">
          <Button variant="link" onClick={closeModal}>
            Cancel
          </Button>

          <Button color="destructive">Delete Guild</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
