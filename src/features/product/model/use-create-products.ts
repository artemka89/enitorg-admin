import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';
import { type CreateProduct } from './types';

export const useCreateProducts = () => {
  return useMutation({
    mutationFn: (data: CreateProduct[]) => productApi.createMany(data),
    meta: {
      invalidateQueries: [productKeys.all],
      successMessage: 'Товары успешно созданы',
      errorMessage: 'Ошибка создания товаров, попробуйте еще раз',
    },
  });
};
