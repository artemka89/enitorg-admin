import { type FC, type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/api/query-client';
export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
