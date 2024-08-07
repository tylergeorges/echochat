'use client';

import { usePathname } from 'next/navigation';

interface AppRoutes {
  guildId?: string;
  channelId?: string;
}

export const useAppRouter = (): AppRoutes => {
  const path = usePathname();

  const paths = path.split('/');

  return {
    channelId: paths[3],
    guildId: paths[2]
  };
};
