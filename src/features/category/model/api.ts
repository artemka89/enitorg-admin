import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { cyrillicToTranslit } from '@/shared/lib/cyrillic-to-translit';
import { API_ROUTES } from '@/shared/routes';

import { categoryKeys } from './query-keys';
import type { Category, CreateCategory, UpdateCategory } from './types';

export const categoryApi = {
  getAll: (onlyParents?: boolean) => {
    return queryOptions({
      queryKey: [...categoryKeys.list(onlyParents)],
      queryFn: () =>
        apiClient<{ items: Category[] }>({
          url: API_ROUTES.categories.base,
          params: { onlyParents },
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
      body: { ...data },
    });
  },
  update: (data: UpdateCategory) => {
    const { id, ...category } = data;

    const slug = cyrillicToTranslit(data.name);

    return apiClient({
      url: API_ROUTES.categories.byId(id),
      method: 'PUT',
      body: { ...category, slug },
    });
  },
  updateOrders: (data: {
    id: string;
    oldIndex: number;
    newIndex: number;
    parentId?: string;
  }) => {
    return apiClient({
      url: API_ROUTES.categories.updateOrders,
      method: 'PUT',
      body: { id: data.id, newOrder: data.newIndex + 1 },
    });
  },
  remove: (id: string) =>
    apiClient({ url: API_ROUTES.categories.byId(id), method: 'DELETE' }),
};
