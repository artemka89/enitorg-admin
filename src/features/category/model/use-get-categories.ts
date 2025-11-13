import { useQuery } from '@tanstack/react-query';

import { categoryApi } from './api';

export const useGetCategories = (params?: { withChildren: boolean }) => {
  return useQuery(categoryApi.getAll(params?.withChildren));
};
