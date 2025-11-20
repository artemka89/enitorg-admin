import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { API_ROUTES } from '@/shared/routes';

import { type LoginSchemaType } from './form-schemas';
import { authKeys } from './query-keys';
import { type User } from './types';

export const authApi = {
  getUser: () => {
    return queryOptions({
      queryKey: authKeys.all,
      queryFn: () => apiClient<User>({ url: API_ROUTES.auth.me }),
    });
  },
  login: (credentials: LoginSchemaType) => {
    return apiClient<{ sessionId: string }>({
      url: API_ROUTES.auth.login,
      method: 'POST',
      body: credentials,
    });
  },
  logout: () => {
    return apiClient({ url: API_ROUTES.auth.logout, method: 'POST' });
  },
};
