'use client';

import type { User } from '@/lib/db/schema/users';
import { Modal, modal } from '@/lib/modal/system';

import { Icons } from '@/components/icons';
import { CreateGuildModal } from '@/components/modals/create-guild-modal';
import { ActionTooltip } from '@/components/ui/action-tooltip';

interface CreateGuildButtonProps {
  user: User;
}

export const CreateGuildButton = ({ user }: CreateGuildButtonProps) => {
  const openGuildForm = () => {
    modal(
      closeModal => <CreateGuildModal user={user} closeModal={closeModal} />,
      Modal.CreateGuildModal
    );
  };

  return (
    <ActionTooltip label="Add a Guild" side="right" align="center">
      <button
        onClick={openGuildForm}
        className="group relative mx-3 mt-2 flex size-12 overflow-hidden rounded-[24px] bg-background-secondary text-primary transition-all center hover:rounded-[16px] hover:bg-emerald-500"
        type="button"
      >
        <Icons.Plus className="group text-emerald-500 transition group-hover:text-white" />
      </button>
    </ActionTooltip>
  );
};
