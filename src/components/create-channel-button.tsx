'use client';

import type { PartialGuild } from '@/lib/db/schema';
import { modal } from '@/lib/modal/system';

import { CreateChannelModal } from '@/components/modals/create-channel-modal';
import { Icons } from '@/components/icons';

interface CreateChannelButtonProps {
  guild: PartialGuild;
}

export const CreateChannelButton = ({ guild }: CreateChannelButtonProps) => {
  const openChannelModal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    modal(closeModal => <CreateChannelModal closeModal={closeModal} guild={guild} />, 20);
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className="text-channel-icon transition hover:text-interactive-hover"
      onClick={openChannelModal}
    >
      <Icons.Plus className="size-4" />
    </button>
  );
};
