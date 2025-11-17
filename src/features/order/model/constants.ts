import type { OrderStatus } from './types';

export const STATUSES: Record<OrderStatus, string> = {
  PENDING: 'В обработке',
  PROCESSING: 'В доставке',
  COMPLETED: 'Доставлен',
  CANCELLED: 'Отменен',
};
