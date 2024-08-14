'use client';

import type { Guild } from '@/lib/db/queries/guild';
import { modal } from '@/lib/modal/system';

import { Icons } from '@/components/icons';
import { CreateChannelModal } from '@/components/modals/create-channel-modal';

interface CreateChannelButtonProps {
  guild: Guild;
}

export const CreateChannelButton = ({ guild }: CreateChannelButtonProps) => {
  const openChannelModal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    modal(closeModal => <CreateChannelModal closeModal={closeModal} guild={guild} />, 20);
  };

  return (
    <button
      type="button"
      className="text-channel-icon transition hover:text-interactive-hover"
      onClick={openChannelModal}
    >
      <Icons.Plus className="size-4" />
    </button>
  );
};
