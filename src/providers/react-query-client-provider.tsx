'use client';

import { getQueryClient } from '@/lib/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { useState } from 'react';

export const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: { queries: { staleTime: 5 * 1000 } }
  //     })
  // );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
