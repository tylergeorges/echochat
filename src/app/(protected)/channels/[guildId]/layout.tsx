'use server';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { useChannelsQuery } from '@/hooks/use-channels-query';
import { useGuildQuery } from '@/hooks/use-guild-query';
import { useGuildsQuery } from '@/hooks/use-guilds-query';
import { getQueryClient } from '@/lib/get-query-client';
import { getUser } from '@/lib/supabase/get-user';

import { GuildSidebar } from '@/components/guild/guild-sidebar';
import { Guilds } from '@/components/guild/guilds';

export default async function GuildLayout({
  params,
  children
}: LayoutProps<{ guildId: string; channelId?: string }>) {
  const queryClient = getQueryClient();

  const user = await getUser();

  if (!user) redirect('/login');

  const guild = await queryClient.fetchQuery(useGuildQuery(params.guildId, user.id ?? ''));

  if (!guild) {
    redirect('/');
  }

  queryClient.prefetchQuery(useChannelsQuery(params.guildId));
  queryClient.prefetchQuery(useGuildsQuery(user.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="size-full flex-1 horizontal">
        {/* <div className="fixed size-full flex-1 horizontal md:relative"> */}
          <Guilds user={user} />
          <GuildSidebar guild={guild} />
        {/* </div> */}

        {children}
      </main>
    </HydrationBoundary>
  );
}
