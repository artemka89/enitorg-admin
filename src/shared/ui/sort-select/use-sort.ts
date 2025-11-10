import { useState } from 'react';
import { useQueryState } from 'nuqs';

import {
  type CurrentSortValue,
  type OrderValue,
  type SortParam,
  type SortValue,
} from './types';

export function useSort() {
  const [sortValue, setSortValue] = useQueryState('sort', {
    defaultValue: 'createdAt',
  });
  const [sortOrder, setSortOrder] = useQueryState('order', {
    defaultValue: 'desc',
  });

  const [sortSelected, setSortSelected] = useState(
    `${sortValue}_${sortOrder}` as CurrentSortValue,
  );

  const onChangeSort = (param: SortParam) => {
    setSortSelected(param.value);
    setSortValue(param.sort);
    setSortOrder(param.order);
  };

  return {
    value: sortSelected,
    sort: sortValue as SortValue,
    order: sortOrder as OrderValue,
    onChangeSort,
  };
}
