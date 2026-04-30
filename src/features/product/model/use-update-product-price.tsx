import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';

export const useUpdateProductPrice = () => {
  return useMutation({
    mutationFn: async (data: { id: string; price: number }) =>
      productApi.updatePrice(data),
    meta: {
      invalidateQueries: [productKeys.all],
      errorMessage: 'Ошибка обновления цены',
    },
  });
};
