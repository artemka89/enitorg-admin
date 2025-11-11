import { useQuery } from '@tanstack/react-query';

import { categoryApi } from './api';

export const useGetCategory = (id?: string) => {
  return useQuery(categoryApi.getOne(id));
};
