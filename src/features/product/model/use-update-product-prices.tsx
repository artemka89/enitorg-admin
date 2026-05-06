import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';

export const useUpdateProductPrices = () => {
  return useMutation({
    mutationFn: async (data: { code: string; price: number }[]) =>
      productApi.updatePrices(data),
    meta: {
      invalidateQueries: [productKeys.all],
      errorMessage: 'Ошибка обновления цены',
    },
  });
};
