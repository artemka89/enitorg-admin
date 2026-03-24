import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';

export function useGenerateProductCode() {
  return useMutation({
    mutationFn: () => productApi.generateCode(),
  });
}
