import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { Badge } from '@/shared/ui/badge';

import { STATUSES } from '../model/constants';
import type { OrderStatus as OrderStatusType } from '../model/types';

interface OrderStatusProps {
  status: OrderStatusType;
  className?: string;
}

export const OrderStatus: FC<OrderStatusProps> = ({ status, className }) => {
  return (
    <Badge className={cn('text-white', className, STATUSES[status].color)}>
      {STATUSES[status].text}
    </Badge>
  );
};
