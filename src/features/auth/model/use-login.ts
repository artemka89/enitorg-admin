import { useMutation } from '@tanstack/react-query';

import { productKeys } from '@/features/product';

import { authApi } from './api';
import { SESSION_ID_LOCALSTORAGE_KEY } from './constants';
import { authKeys } from './query-keys';

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    meta: {
      invalidateQueries: [authKeys.all, productKeys.all],
    },
    onSuccess: async (data) => {
      localStorage.setItem(SESSION_ID_LOCALSTORAGE_KEY, data.sessionId);
    },
  });
};
