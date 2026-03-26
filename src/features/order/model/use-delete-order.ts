import { useMutation } from '@tanstack/react-query';

import { orderApi } from './api';
import { orderKeys } from './query-keys';

export function useDeleteOrder() {
  return useMutation({
    mutationFn: orderApi.delete,
    meta: {
      invalidateQueries: [orderKeys.all],
      errorMessage: 'Ошибка удаления заказа, попробуйте еще раз',
    },
  });
}
