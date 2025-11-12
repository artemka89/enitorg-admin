import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';
import { type AddProduct } from './types';

export const useAddProducts = () => {
  return useMutation({
    mutationFn: (data: AddProduct[]) => productApi.createMany(data),
    meta: {
      invalidateQueries: [productKeys.all],
      successMessage: 'Товары успешно созданы',
      errorMessage: 'Ошибка создания товаров, попробуйте еще раз',
    },
  });
};
