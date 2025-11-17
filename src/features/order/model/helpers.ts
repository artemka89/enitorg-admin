import { STATUSES } from './constants';
import type { OrderStatus, OrderStatusItem } from './types';

export function getStatusList(currentStatus: OrderStatus): OrderStatusItem[] {
  const statuses = Object.keys(STATUSES).map((key) => {
    let disabled = false;

    if (currentStatus === 'PROCESSING' && key === 'PENDING') {
      disabled = true;
    }

    if (currentStatus === 'CANCELLED' || currentStatus === 'COMPLETED') {
      disabled = true;
    }

    if (key === currentStatus) disabled = true;

    return {
      value: key as OrderStatus,
      label: STATUSES[key as OrderStatus].text,
      color: STATUSES[key as OrderStatus].color,
      disabled,
    };
  });

  return statuses;
}
