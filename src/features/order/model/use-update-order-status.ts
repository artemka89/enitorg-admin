import { useMutation } from '@tanstack/react-query';

import { orderApi } from './api';
import { orderKeys } from './query-keys';

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: orderApi.updateStatus,
    meta: {
      invalidateQueries: [orderKeys.all],
      errorMessage: 'Ошибка обновления статуса заказа, попробуйте еще раз',
    },
  });
}
