import { STATUSES } from './constants';
import type { OrderStatus, OrderStatuses } from './types';

export function getStatusList(currentStatus: OrderStatus) {
  const statuses = Object.entries(STATUSES).map(([value, label]) => {
    let disabled = false;

    if (currentStatus === 'PROCESSING' && value === 'PENDING') {
      disabled = true;
    }

    if (currentStatus === 'CANCELLED' || currentStatus === 'COMPLETED') {
      disabled = true;
    }

    if (value === currentStatus) disabled = true;

    return {
      value,
      label,
      disabled,
    } as OrderStatuses & { disabled: boolean };
  });

  return statuses;
}
