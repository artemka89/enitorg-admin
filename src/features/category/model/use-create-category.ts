import { useMutation } from '@tanstack/react-query';

import { categoryApi } from './api';
import { categoryKeys } from './query-keys';
import { type CreateCategory } from './types';

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: CreateCategory) => categoryApi.create(data),
    meta: {
      invalidateQueries: [categoryKeys.all],
      successMessage: 'Категория успешно создана',
      errorMessage: 'Ошибка создания категории, попробуйте еще раз',
    },
  });
};
