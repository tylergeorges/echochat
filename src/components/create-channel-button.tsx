'use client';

import type { PartialGuild } from '@/lib/db/schema';

import { modal } from '@/components/modal/system';
import { ChannelForm } from '@/components/channel-form';
import { Icons } from '@/components/icons';

interface CreateChannelButtonProps {
  guild: PartialGuild;
}

export const CreateChannelButton = ({ guild }: CreateChannelButtonProps) => {
  const openChannelForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    modal(closeModal => <ChannelForm closeModal={closeModal} guild={guild} />, 20);
  };

  return (
    <button
      type="button"
      className="text-channel-icon transition hover:text-interactive-hover"
      onClick={openChannelForm}
    >
      <Icons.Plus className="size-4" />
    </button>
  );
};
