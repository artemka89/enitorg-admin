import type { FC } from 'react';
import { RouterProvider } from 'react-router/dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { Toaster } from '@/shared/ui/sonner';

import { QueryProvider } from './providers/query-client-provider';
import { ThemeProvider } from './providers/theme-provider';
import { router } from './router/router';

export const App: FC = () => {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </NuqsAdapter>
      <Toaster duration={5000} position="top-right" offset={{ top: 70 }} />
      <ReactQueryDevtools initialIsOpen={import.meta.env.DEV || false} />
    </QueryProvider>
  );
};
