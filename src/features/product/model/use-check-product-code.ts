import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';

export const useCheckProductCode = () => {
  return useMutation({
    mutationFn: (code: string) => productApi.checkProductCode(code),
  });
};
