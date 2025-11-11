import {
  MutationCache,
  QueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { toast } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidateQueries?: QueryKey[];
      resetQueries?: QueryKey[];
      errorMessage?: string;
      successMessage?: string;
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 60 * 5 * 1000,
    },
  },
  mutationCache: new MutationCache({
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        mutation.meta.invalidateQueries.forEach((queryKey) =>
          queryClient.invalidateQueries({ queryKey, type: 'all' }),
        );
      }
    },
    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        toast.error(mutation.meta.errorMessage);
      }
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }
      if (mutation.meta?.resetQueries) {
        mutation.meta.resetQueries.forEach((queryKey) =>
          queryClient.resetQueries({ queryKey }),
        );
      }
    },
  }),
});
