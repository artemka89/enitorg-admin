import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router';

import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';
import { ROUTES } from '@/shared/routes';
import { Typography } from '@/shared/ui/typography';

import { useDeleteOrder } from '../../model/use-delete-order';
import { useGetOrder } from '../../model/use-get-order';
import { StatusSelector } from '../status-selector';

import { OrderDescriptionText } from './order-description-text';
import { OrderItem } from './order-item';
import { RemoveOrderModal } from './remove-order-modal';

export const OrderDitails: FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data } = useGetOrder(params.id);

  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();

  if (!data) return null;

  const handleDelete = () => {
    deleteOrder(data.id, {
      onSuccess: () => {
        navigate(ROUTES.orders.base);
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <Typography tag="h2" size="3xl">
          Заказ №: <span className="font-semibold">{data.number}</span>
        </Typography>
        <StatusSelector
          orderId={data.id}
          currentStatus={data.status}
          className="min-w-36"
        />
        <RemoveOrderModal
          onRemove={handleDelete}
          isLoading={isDeleting}
          orderNumber={data.number}
          className="ml-auto"
        />
      </div>

      <div className="mb-4 w-full max-w-[570px]">
        <OrderDescriptionText
          title="Дата заказа"
          text={formatDate(data.createdAt, true)}
        />
        {data.customerName && (
          <OrderDescriptionText title="Имя клиента" text={data.customerName} />
        )}
        <OrderDescriptionText
          title="Телефон клиента"
          text={data.customerPhone}
        />
        {data.customerEmail && (
          <OrderDescriptionText
            title="Email клиента"
            text={data.customerEmail}
          />
        )}
        <OrderDescriptionText
          title="Сумма заказа"
          text={formatPrice(data.totalPrice)}
        />
      </div>

      <Typography tag="p" size="base" className="mb-2">
        Комментарий клиента:{' '}
        <span className="font-semibold">{data.customerComment}</span>
      </Typography>

      <Typography tag="h3" size="2xl" weight="bold" className="mb-2">
        Товары:
      </Typography>
      <div className="flex flex-col gap-2">
        {data.items.map((item, index) => (
          <OrderItem key={item.code} item={item} order={index + 1} />
        ))}
      </div>
    </>
  );
};
