import { redirect } from 'next/navigation';

import { getUser } from '@/lib/supabase/get-user';

import { Column } from '@/components/flex';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/login-button';
import { Hero } from '@/components/hero';

export default async function LoginPage() {
  const user = await getUser();

  if (user) return redirect('/');

  return (
    <Column className="h-full w-full bg-background-tertiary py-8 horizontal center-h">
      <header className="mx-auto w-full animate-fade-down justify-between px-8 horizontal center-v animate-delay-150">
        <Icons.EchoBot className="size-10 text-white" />

        <LoginButton className="justify-self-end">Get Started</LoginButton>
      </header>

      <Hero />
    </Column>
  );
}
