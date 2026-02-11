import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { categoryApi } from './api';
import type { Category } from './types';

export function useUpdateOrderCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.updateOrders,
    onMutate: async ({ oldIndex, newIndex, parentId }) => {
      const queryKey = categoryApi.getAll().queryKey;

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousItems = queryClient.getQueryData(queryKey);

      if (!previousItems) {
        return;
      }

      const updateItems = (items: Category[]) =>
        arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          order: index + 1,
        }));

      if (parentId) {
        const updatedItems = previousItems.items.map((item) =>
          item.id === parentId
            ? {
                ...item,
                children: updateItems(item.children || []),
              }
            : item,
        );
        queryClient.setQueryData(queryKey, {
          ...previousItems,
          items: updatedItems,
        });
      } else {
        queryClient.setQueryData(queryKey, {
          ...previousItems,
          items: updateItems(previousItems.items),
        });
      }

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
