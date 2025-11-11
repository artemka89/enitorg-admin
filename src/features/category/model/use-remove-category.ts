import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { API_ROUTES } from '@/shared/routes';

import { categoryApi } from './api';
import { categoryKeys } from './query-keys';

export function useRemoveCategory() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: string) => categoryApi.remove(id),
    onSuccess: () => navigate(API_ROUTES.categories.base),
    onError: ({ message }) => toast.error(message),
    meta: {
      invalidateQueries: [categoryKeys.all],
    },
  });
}
