import { type FC } from 'react';

import { OrderDitails } from '@/features/order';
import { cn } from '@/shared/lib/cn';

interface OrderPageProps {
  className?: string;
}

export const OrderPage: FC<OrderPageProps> = ({ className }) => {
  return (
    <div className={cn(className, 'container mx-auto')}>
      <OrderDitails />
    </div>
  );
};
