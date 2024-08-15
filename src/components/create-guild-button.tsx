'use client';

import type { User } from '@/lib/db/schema/users';
import { modal } from '@/lib/modal/system';

import { Icons } from '@/components/icons';
import { CreateGuildModal } from '@/components/modals/create-guild-modal';

interface CreateGuildButtonProps {
  user: User;
}

export const CreateGuildButton = ({ user }: CreateGuildButtonProps) => {
  const openGuildForm = () => {
    modal(closeModal => <CreateGuildModal user={user} closeModal={closeModal} />, 10);
  };

  return (
    <button
      onClick={openGuildForm}
      className="mt-2 group relative mx-3  flex size-12 overflow-hidden rounded-[24px] bg-background-secondary text-primary transition-all center hover:rounded-[16px] hover:bg-emerald-500"
      type="button"
    >
      <Icons.Plus className="group text-emerald-500 transition group-hover:text-white" />
    </button>
  );
};
