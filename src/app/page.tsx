'use server';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { useGuildsQuery } from '@/hooks/use-guilds-query';
import { getUser } from '@/lib/supabase/get-user';

import { Guilds } from '@/components/guild/guilds';

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
    <main className="relative z-0 flex-1 horizontal">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Guilds user={user} />
      </HydrationBoundary>
    </main>
  );
}
