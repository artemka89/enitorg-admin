import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { productApi } from './api';
import { productKeys } from './query-keys';
import { type AddProduct } from './types';

export const useAddProducts = () => {
  return useMutation({
    mutationFn: (data: AddProduct[]) => productApi.createMany(data),
    meta: {
      invalidateQueries: [productKeys.all],
      successMessage: 'Товары успешно созданы',
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
