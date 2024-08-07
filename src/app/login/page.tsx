import { redirect } from 'next/navigation';

import { getUser } from '@/lib/supabase/get-user';

import { AuthForm } from '@/components/auth-form';
import { Column } from '@/components/flex';

export default async function LoginPage() {
  const user = await getUser();

  if (user) return redirect('/');

  return (
    <Column className="h-full w-full p-8 py-8 horizontal center-h">
      <Column className="h-full w-full gap-3 space-y-6 center vertical sm:max-w-xs">
        <div>
          <h1 className="m-0 text-2xl font-bold">Welcome</h1>
        </div>
        <AuthForm />
      </Column>
    </Column>
  );
}
