import { redirect } from 'next/navigation';

import { getUser } from '@/lib/supabase/get-user';

import { Column } from '@/components/flex';
import { Hero } from '@/components/hero';

export default async function LoginPage() {
  const user = await getUser();

  if (user) return redirect('/');

  return (
    <Column className="relative size-full overflow-hidden bg-[hsl(5_5_5)] horizontal center-h">
      <div className="relative size-full flex-1">
        <Hero />
      </div>
    </Column>
  );
}
