'use client';

import { useState } from 'react';
import { Provider } from '@supabase/supabase-js';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { getBaseUrl } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export const AuthForm = () => {
  const [isProviderLoading, setIsProviderLoading] = useState(false);

  const signInWith = async (provider: Provider) => {
    if (isProviderLoading) return;

    const supabase =  createClient();

    setIsProviderLoading(true);

    await supabase.auth.signInWithOAuth({
      provider,

      options: {
        redirectTo: `${getBaseUrl()}/auth/callback`
        // redirectTo: '/auth/callback'
      }
    });
  };

  return (
    <form className="animate-fade-up w-full gap-4 text-foreground center-v vertical">
      <Button
        onClick={e => {
          e.preventDefault();

          signInWith('google');
        }}
        disabled={isProviderLoading}
      >
        <Icons.Google className="h-4 w-4" />
        Google
      </Button>
    </form>
  );
};
