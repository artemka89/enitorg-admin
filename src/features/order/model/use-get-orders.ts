import { useQuery } from '@tanstack/react-query';

import { orderApi } from './api';

export function useGetOrders() {
  return useQuery(orderApi.getAll());
}
