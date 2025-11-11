import { useMutation } from '@tanstack/react-query';

import { categoryApi } from './api';
import { categoryKeys } from './query-keys';
import { type UpdateCategory } from './types';

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: (data: UpdateCategory) => categoryApi.update(data),
    meta: {
      invalidateQueries: [categoryKeys.all],
      successMessage: 'Категория успешно обновлена',
      errorMessage: 'Ошибка обновления категории, попробуйте еще раз',
    },
  });
};
