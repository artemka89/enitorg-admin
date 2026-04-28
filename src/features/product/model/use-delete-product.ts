import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),
  });
}
