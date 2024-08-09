import { getUser } from '@/lib/supabase/get-user';

import { Guilds } from '@/components/guild/guilds';

export default async function Home() {
  const user = await getUser();

  return (
    <main className="relative z-0 flex-1 horizontal">
      <Guilds user={user} />
    </main>
  );
}
