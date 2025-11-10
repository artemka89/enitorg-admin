import { type CurrentSortValue, type SortOption } from './types';

export const SORT_OPTIONS: Record<CurrentSortValue, SortOption> = {
  createdAt_desc: { sort: 'createdAt', label: 'по новинкам', order: 'desc' },
  price_asc: { sort: 'price', label: 'сначала дешевле', order: 'asc' },
  price_desc: { sort: 'price', label: 'сначала дороже', order: 'desc' },
};
