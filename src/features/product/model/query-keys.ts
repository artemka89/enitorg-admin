import { type ProductsParams } from './types';

export const productKeys = {
  all: ['products'] as const,
  list: (params?: ProductsParams) => {
    const key = [...productKeys.all, 'list'] as const;
    return params ? ([...key, params] as const) : key;
  },
  byId: (id: string) => [...productKeys.all, 'one', id] as const,
};
