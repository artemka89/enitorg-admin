export type OrderValue = 'asc' | 'desc';
export type SortValue = 'createdAt' | 'price';
export type CurrentSortValue = Exclude<
  `${SortValue}_${OrderValue}`,
  'createdAt_asc'
>;

export type SortOption = { sort: SortValue; label: string; order: OrderValue };
export type SortParam = {
  value: CurrentSortValue;
  sort: SortValue;
  order: OrderValue;
};
