'use client';

import type { Guild } from '@/lib/db/queries/guild';
import { Modal, modal } from '@/lib/modal/system';

import { Icons } from '@/components/icons';
import { CreateChannelModal } from '@/components/modals/create-channel-modal';
import { ActionTooltip } from '@/components/ui/action-tooltip';

interface CreateChannelButtonProps {
  guild: Guild;
}

export const CreateChannelButton = ({ guild }: CreateChannelButtonProps) => {
  const openChannelModal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    modal(
      closeModal => <CreateChannelModal closeModal={closeModal} guild={guild} />,
      Modal.CreateChannelModal
    );
  };

  return (
    <ActionTooltip label="Create Channel" align="center">
      <button
        type="button"
        className="text-channel-icon transition hover:text-interactive-hover"
        onClick={openChannelModal}
      >
        <Icons.Plus className="size-4" />
      </button>
    </ActionTooltip>
  );
};
