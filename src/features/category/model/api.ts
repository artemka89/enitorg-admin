import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { API_ROUTES } from '@/shared/routes';

import { categoryKeys } from './query-keys';
import type { Category, CreateCategory, UpdateCategory } from './types';

export const categoryApi = {
  getAll: (withChildren?: boolean) => {
    return queryOptions({
      queryKey: [...categoryKeys.all, withChildren],
      queryFn: () =>
        apiClient<{ items: Category[] }>({
          url: API_ROUTES.categories.base,
          params: { withChildren },
        }),
    });
  },
  getOne: (id?: string) => {
    return queryOptions({
      queryKey: [...categoryKeys.byId(id as string)],
      queryFn: ({ signal }) =>
        apiClient<Category>({
          url: API_ROUTES.categories.byId(id as string),
          signal,
        }),
      enabled: !!id,
    });
  },
  create: (data: CreateCategory) => {
    return apiClient({
      url: API_ROUTES.categories.base,
      method: 'POST',
      body: data,
    });
  },
  update: (data: UpdateCategory) => {
    const { id, ...category } = data;
    return apiClient({
      url: API_ROUTES.categories.byId(id),
      method: 'PUT',
      body: category,
    });
  },
  remove: (id: string) =>
    apiClient({ url: API_ROUTES.categories.byId(id), method: 'DELETE' }),
};
