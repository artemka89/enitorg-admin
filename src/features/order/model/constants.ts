import type { OrderStatus } from './types';

export const STATUSES: Record<
  OrderStatus,
  { color: string; text: string; dissabled?: boolean }
> = {
  PENDING: {
    color: 'bg-gray-600 text-white dark:bg-gray-600 dark:text-white',
    text: 'В обработке',
  },
  PROCESSING: {
    color: 'bg-orange-400 text-white dark:bg-orange-400 dark:text-white',
    text: 'Доставляется',
  },
  COMPLETED: {
    color: 'bg-green-600 text-white dark:bg-green-600 dark:text-white',
    text: 'Доставлен',
    dissabled: true,
  },
  CANCELLED: {
    color: 'bg-red-600 text-white dark:bg-red-600 dark:text-white',
    text: 'Отменен',
    dissabled: true,
  },
};
