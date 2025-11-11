import type { FC } from 'react';
import { RouterProvider } from 'react-router/dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { queryClient } from '@/shared/api/query-client';
import { Toaster } from '@/shared/ui/sonner';

import { router } from './router/router';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
      <Toaster duration={5000} position="top-right" offset={{ top: 70 }} />
      <ReactQueryDevtools initialIsOpen={import.meta.env.DEV || false} />
    </QueryClientProvider>
  );
};
