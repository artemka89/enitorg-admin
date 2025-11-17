import { useQuery } from '@tanstack/react-query';

import { orderApi } from './api';

export function useGetOrder(id?: string) {
  return useQuery(orderApi.getOne(id));
}
