'use client';

import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/shared/routes';

import { authApi } from './api';
import { SESSION_ID_LOCALSTORAGE_KEY } from './constants';
import { authKeys } from './query-keys';

export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authApi.logout,
    meta: {
      resetQueries: [authKeys.all],
    },
    onSuccess: async () => {
      navigate(ROUTES.login.base);
      localStorage.removeItem(SESSION_ID_LOCALSTORAGE_KEY);
    },
  });
};
