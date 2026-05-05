import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type { PaginatedResponse } from '@/shared/api/types';

import { productApi } from './api';
import { productKeys } from './query-keys';
import type { Product } from './types';

export const useUpdateProductPrice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; price: number }) =>
      productApi.updatePrice(data),
    meta: {
      errorMessage: 'Ошибка обновления цены',
    },
    onSuccess: (response) => {
      const { id, newPrice } = response;

      if (!newPrice) return;

      queryClient.setQueriesData<InfiniteData<PaginatedResponse<Product>>>(
        { queryKey: productKeys.list() },
        (oldData) => {
          if (!oldData) return oldData;

          let found = false;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              if (found) return page;

              const hasProduct = page.items.some((p) => p.id === id);
              if (!hasProduct) return page;

              found = true;
              return {
                ...page,
                items: page.items.map((product) =>
                  product.id === id ? { ...product, price: newPrice } : product,
                ),
              };
            }),
          };
        },
      );
    },
    onSettled: async (data) => {
      if (!data?.id) return;
      await queryClient.invalidateQueries({
        queryKey: productKeys.byId(data.id),
      });
    },
  });
};
