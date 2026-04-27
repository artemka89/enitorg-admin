import { useQueryState } from 'nuqs';

import { type OrderValue, type SortParam, type SortValue } from './types';

export function useSort() {
  const [sortValue, setSortValue] = useQueryState('sort', {
    defaultValue: 'createdAt',
  });
  const [sortOrder, setSortOrder] = useQueryState('order', {
    defaultValue: 'desc',
  });

  const onChangeSort = (param: SortParam) => {
    setSortValue(param.sort);
    setSortOrder(param.order);
  };

  return {
    sort: sortValue as SortValue,
    order: sortOrder as OrderValue,
    onChangeSort,
  };
}
