import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { categoryApi } from './api';

export function useUpdateOrderCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.updateOrders,
    onMutate: async ({ oldIndex, newIndex }) => {
      const queryKey = categoryApi.getAll().queryKey;

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousItems = queryClient.getQueryData(queryKey);

      const reorderItems = arrayMove(
        previousItems?.items || [],
        oldIndex,
        newIndex,
      ).map((item, index) => ({ ...item, order: index + 1 }));

      queryClient.setQueryData(queryKey, { items: reorderItems });

      return { previousItems };
    },
    onError: (_error, _newItems, context) => {
      queryClient.setQueryData(
        categoryApi.getAll().queryKey,
        context?.previousItems,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: categoryApi.getAll().queryKey,
      });
    },
  });
}
