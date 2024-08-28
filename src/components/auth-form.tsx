'use client';

import type { Provider } from '@supabase/supabase-js';
import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { getBaseUrl } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button, ButtonLink } from '@/components/ui/button';
import { Column } from '@/components/flex';

export const AuthForm = () => {
  const [isProviderLoading, setIsProviderLoading] = useState(false);

  const signInWith = async (provider: Provider) => {
    if (isProviderLoading) return;

    const supabase = createClient();

    setIsProviderLoading(true);

    await supabase.auth.signInWithOAuth({
      provider,

      options: {
        redirectTo: `${getBaseUrl()}/auth/callback`
      }
    });
  };

  return (
    <>
      <header className="animate-fade-down animate-delay-150 w-full justify-between horizontal center-v">
        <Icons.EchoBot className="size-10 text-white" />

        <Button
          onClick={e => {
            e.preventDefault();

            signInWith('google');
          }}
          disabled={isProviderLoading}
          color="white"
          className="justify-self-end"
        >
          Get Started
        </Button>
      </header>

      <Column className="prose animate-fade-up animate-delay-75 h-full w-full gap-3 text-center center vertical">
        <h1 className="animate-fade-up animate-delay-75 m-0 text-center md:text-6xl">
          Your Guild Awaits
        </h1>
        <p className="animate-delay-100 animate-fade-up mt-0 text-center md:text-lg">
          Log in to explore, chat, and create together.
        </p>

        <form className="animate-fade-up animate-delay-150 w-full gap-4 text-foreground horizontal center">
          <Button
            onClick={e => {
              e.preventDefault();

              signInWith('google');
            }}
            disabled={isProviderLoading}
            className="group"
            size="xl"
            color="white"
          >
            <span className="transition duration-300 group-hover:-translate-x-2">Get Started</span>

            <Icons.RightArrow className="absolute right-1 size-5 translate-x-full text-current opacity-0 transition duration-300 group-hover:-translate-x-1 group-hover:opacity-100" />
          </Button>

          <ButtonLink
            className="group relative size-14 overflow-hidden"
            target="_blank"
            size="icon"
            variant="outline"
            color="secondary"
            href={'https://github.com/tylergeorges/echochat'}
          >
            <Icons.GitHub className="size-6 text-current" />
          </ButtonLink>
        </form>
      </Column>
    </>
  );
};
