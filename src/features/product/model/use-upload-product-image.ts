import { useMutation } from '@tanstack/react-query';

import { productApi } from './api';
import { productKeys } from './query-keys';

export const useUploadProductImage = () => {
  return useMutation({
    mutationFn: (file: File) => productApi.uploadImage(file),
    meta: {
      invalidateQueries: [productKeys.all],
      successMessage: 'Изображение успешно загружено',
      errorMessage: 'Ошибка загрузки изображения',
    },
  });
};
