import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';

export function useMoveProductVariant() {
  return useMutation({
    mutationFn: (data: { newProductId: string; variantId: string }) =>
      productApi.moveVariant(data),
    meta: {
      invalidateQueries: [productKeys.all],
    },
  });
}
