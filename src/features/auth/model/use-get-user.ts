import { useQuery } from '@tanstack/react-query';

import { authApi } from './api';
import { SESSION_ID_LOCALSTORAGE_KEY } from './constants';

export const useGetUser = () => {
  const sessionId = localStorage.getItem(SESSION_ID_LOCALSTORAGE_KEY);

  return useQuery({
    ...authApi.getUser(),
    enabled: !!sessionId,
    retry: (failureCount, error) => {
      if (error) {
        localStorage.removeItem(SESSION_ID_LOCALSTORAGE_KEY);
        return false;
      }
      return failureCount < 1;
    },
  });
};
