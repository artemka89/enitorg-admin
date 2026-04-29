import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { categoryApi } from './api';
import { categoryKeys } from './query-keys';
import { type UpdateCategory } from './types';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCategory) => categoryApi.update(data),
    meta: {
      successMessage: 'Категория успешно обновлена',
      errorMessage: 'Ошибка обновления категории, попробуйте еще раз',
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
      await queryClient.invalidateQueries({
        queryKey: categoryKeys.byId(variables.id),
      });
    },
  });
};
