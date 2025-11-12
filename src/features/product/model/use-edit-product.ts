import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';
import { type UpdateProduct } from './types';

export const useEditProduct = () => {
  return useMutation({
    mutationFn: (data: UpdateProduct) => productApi.update(data),
    meta: {
      invalidateQueries: [productKeys.all],
      errorMessage: 'Ошибка обновления товара, попробуйте еще раз',
      successMessage: 'Товар успешно обновлен',
    },
  });
};
