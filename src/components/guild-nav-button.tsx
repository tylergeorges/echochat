/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { useRouter } from 'next/navigation';

import type { Guild } from '@/lib/db/schema';

interface GuildNavButtonProps {
  guild: Guild;
}

export const GuildNavButton = ({ guild }: GuildNavButtonProps) => {
  const router = useRouter();

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    router.push(`/channels/${guild.id}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mx-3 flex size-12 overflow-hidden rounded-[50%] bg-background text-primary transition-all group-hover:rounded-[16px]"
    >
      <div />
    </button>
  );
};
