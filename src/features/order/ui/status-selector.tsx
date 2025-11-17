import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { getStatusList } from '../model/helpers';
import type { OrderStatus } from '../model/types';
import { useUpdateOrderStatus } from '../model/use-update-order-status';

interface StatusSelectorProps {
  orderId: string;
  currentStatus: OrderStatus;
  className?: string;
}

export const StatusSelector: FC<StatusSelectorProps> = ({
  orderId,
  currentStatus,
  className,
}) => {
  const { mutate, isPending } = useUpdateOrderStatus();

  const statuses = getStatusList(currentStatus);

  const handleUpdateStatus = (value: OrderStatus) => {
    mutate({ id: orderId, status: value });
  };

  const getStyleItem = (status: OrderStatus) => [
    {
      'bg-gray-600 dark:bg-gray-600 text-white focus:bg-gray-500 focus:text-white':
        status === 'PENDING',
    },
    {
      'bg-yellow-700 dark:bg-yellow-700 text-white focus:bg-yellow-600 focus:text-white':
        status === 'PROCESSING',
    },
    {
      'bg-green-700 dark:bg-green-700 text-white focus:bg-green-600 focus:text-white':
        status === 'COMPLETED',
    },
    {
      'bg-red-600 dark:bg-red-600 text-white focus:bg-red-500 focus:text-white':
        status === 'CANCELLED',
    },
  ];

  return (
    <Select
      value={currentStatus}
      disabled={isPending}
      onValueChange={handleUpdateStatus}
    >
      <SelectTrigger
        className={cn(
          className,
          "cursor-pointer [&_svg:not([class*='text-'])]:text-white hover:bg-muted-foreground",
          getStyleItem(currentStatus),
        )}
      >
        <SelectValue placeholder="Статус" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem
            key={status.value}
            value={status.value}
            disabled={status.disabled}
            className={cn('cursor-pointer my-1 ')}
          >
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
