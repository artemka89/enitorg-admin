import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { productApi } from './api';

export const useUpdateProductExports = () => {
  return useMutation({
    mutationFn: productApi.updateExports,
    onSuccess: () => {
      toast.success('Талицы товаров успешно обновлены');
    },
    onError: () => {
      toast.error('Ошибка обновления таблиц товаров');
    },
  });
};
