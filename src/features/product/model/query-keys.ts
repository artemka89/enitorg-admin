import { type ProductsParams } from './types';

export const productKeys = {
  all: ['products'] as const,
  list: (params?: ProductsParams) =>
    [...productKeys.all, 'list', params] as const,
  byId: (id: string) => [...productKeys.all, 'one', id] as const,
};
