import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { formatPrice } from '@/shared/lib/format-price';
import { Typography } from '@/shared/ui/typography';

import { OrderMetric } from './order-metric';

interface OrderItem {
  productId: string;
  code: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  weight: number;
}

interface OrderItemProps {
  item: OrderItem;
  order: number;
  className?: string;
}

export const OrderItem: FC<OrderItemProps> = ({ item, order, className }) => {
  return (
    <div
      className={cn(
        className,
        'bg-secondary/70 rounded-lg p-4 hover:border-border hover:bg-secondary border border-transparent',
      )}
    >
      <div className="flex items-start gap-4">
        <p className="text-2xl font-semibold">{order}.</p>
        <div>
          <Typography size="sm" variant="muted" className="leading-tight">
            Код товара: {item.code}
          </Typography>
          <Typography tag="h3" weight="semibold">
            {item.name}
          </Typography>
        </div>
      </div>
      <div className="mt-2 flex gap-4 sm:items-center">
        <div className="bg-background size-24 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-contain p-1"
          />
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <OrderMetric name="Цена" value={formatPrice(item.price)} />
          <OrderMetric name="Количество" value={item.quantity} unit="шт" />
          {/* TODO: вес временно отключен */}
          {/* <OrderMetric
            name="Вес"
            value={(item.quantity * item.weight) / 1000}
            unit="кг"
          /> */}

          <OrderMetric
            name="Сумма"
            value={formatPrice(item.quantity * item.price)}
          />
        </div>
      </div>
    </div>
  );
};
