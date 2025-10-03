import type { FC } from 'react';
import { RouterProvider } from 'react-router/dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/api/query-client';

import { router } from './router/router';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
