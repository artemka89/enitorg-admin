import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { API_ROUTES } from '@/shared/routes';

import { orderKeys } from './query-keys';
import type { Order, OrderStatus, OrderTableItem } from './types';

export const orderApi = {
  getAll: () => {
    return queryOptions({
      queryKey: [...orderKeys.all],
      queryFn: () =>
        apiClient<{ items: OrderTableItem[] }>({
          url: API_ROUTES.orders.base,
        }),
    });
  },
  getOne: (id?: string) => {
    return queryOptions({
      queryKey: [...orderKeys.byId(id as string)],
      queryFn: ({ signal }) =>
        apiClient<Order>({
          url: API_ROUTES.orders.byId(id as string),
          signal,
        }),
      enabled: !!id,
    });
  },
  updateStatus: (data: { id: string; status: OrderStatus }) =>
    apiClient({
      url: API_ROUTES.orders.updateStatus(data.id),
      method: 'PUT',
      body: data,
    }),
};
