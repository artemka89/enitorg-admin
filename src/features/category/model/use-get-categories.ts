import { useQuery } from '@tanstack/react-query';

import { categoryApi } from './api';

export const useGetCategories = (params?: { onlyParents?: boolean }) => {
  return useQuery(categoryApi.getAll(params?.onlyParents));
};
