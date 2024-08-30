'use server';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { Column } from '@/components/flex';
import { GuildSidebar } from '@/components/guild/guild-sidebar';
import { Guilds } from '@/components/guild/guilds';
import { useGuildsQuery } from '@/hooks/use-guilds-query';
import { getUser } from '@/lib/supabase/get-user';

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  });

  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  await queryClient.prefetchQuery(useGuildsQuery(user.id));

  return (
    <main className="relative z-0 size-full flex-1 horizontal">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Guilds user={user} />
        <GuildSidebar user={user} />

        <div className="hidden size-full flex-1 center md:vertical">
          <Column className="prose relative w-full flex-1 center vertical">
            <h2 className="mb-0">Connect with your community</h2>
            <p className="mt-0">
              Explore or create a guild to connect, collaborate, and grow your community.
            </p>
          </Column>
        </div>
      </HydrationBoundary>
    </main>
  );
}
