import { getUser } from '@/lib/supabase/get-user';

import { GuildNav } from '@/components/guild-nav';

export default async function Home() {
  const user = await getUser();

  return (
    <main className="relative z-0 flex-1 horizontal">
      <GuildNav user={user} />
    </main>
  );
}
