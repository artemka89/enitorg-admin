import { useInfiniteQuery } from '@tanstack/react-query';

import { productApi } from './api';
import { type ProductsParams } from './types';

export const useGetProducts = (params?: ProductsParams) => {
  return useInfiniteQuery(productApi.getAll(params));
};
