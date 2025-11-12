import { useQuery } from '@tanstack/react-query';

import { productApi } from './api';

export const useGetProduct = (id?: string) => {
  return useQuery(productApi.getById(id));
};
