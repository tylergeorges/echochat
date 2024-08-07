
'use client';

import { modal } from '@/components/modal/system';
import type { User } from '@/lib/db/schema';

import { Icons } from '@/components/icons';
import { ServerForm } from '@/components/server-form';

interface CreateServerButtonProps {
  user: User;
}

export const CreateServerButton = ({ user }: CreateServerButtonProps) => {
  const openServerForm = () => {
    modal(closeModal => <ServerForm user={user} closeModal={closeModal} />, 10);
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      onClick={openServerForm}
      className="group relative mx-3 flex size-12 overflow-hidden rounded-[24px] bg-background text-primary transition-all center hover:rounded-[16px] hover:bg-emerald-500"
      type="button"
    >
      <Icons.Plus className="group text-emerald-500 transition group-hover:text-white" />
    </button>
  );
};
