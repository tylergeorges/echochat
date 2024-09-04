import { redirect } from 'next/navigation';

import { getUser } from '@/lib/supabase/get-user';

import { Column } from '@/components/flex';
import { Hero } from '@/components/hero';
import { Icons } from '@/components/icons';
import { LoginButton } from '@/components/login-button';

export default async function LoginPage() {
  const user = await getUser();

  if (user) return redirect('/');

  return (
    <Column className="relative h-full w-full overflow-hidden bg-background-tertiary horizontal center-h">
      <div className="absolute z-0 h-[400px] w-[590px] animate-ping rounded-full bg-gradient-to-tr from-sky-600 via-blue-200 to-indigo-700 blur-[90px] animate-duration-[2s]" />

      <div className="absolute z-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-sky-600 via-blue-200 to-indigo-700 blur-[90px]" />

      <div className="relative size-full flex-1 bg-background-tertiary/70 py-8 center vertical">
        <header className="mx-auto w-full animate-fade-down justify-between px-8 horizontal center-v animate-delay-150">
          <span className="select-none items-center space-x-2 horizontal">
            <Icons.EchoBot className="size-6 text-white" />

            <h1 className="font-bold text-white">Echo Chat</h1>
          </span>

          <LoginButton className="justify-self-end rounded-full">Get Started</LoginButton>
        </header>

        <Hero />
      </div>
    </Column>
  );
}
