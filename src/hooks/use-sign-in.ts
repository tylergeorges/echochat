'use client';

import { useState } from 'react';
import { Provider } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';
import { getBaseUrl } from '@/lib/utils';

export const useSignIn = () => {
  const [isProviderLoading, setIsProviderLoading] = useState(false);

  const signInWith = async (provider: Provider = 'google') => {
    if (isProviderLoading) return;

    const supabase = createClient();

    setIsProviderLoading(true);

    const baseUrl = getBaseUrl();

    const redirectUrl = `${baseUrl}/auth/callback`;

    console.log(redirectUrl)

    await supabase.auth.signInWithOAuth({
      provider,

      options: {
        redirectTo: redirectUrl
      }
    });
  };

  return [signInWith, isProviderLoading] as const;
};
