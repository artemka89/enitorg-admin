import { href, Link } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';

import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';
import { ROUTES } from '@/shared/routes';

import type { OrderTableItem } from '../../model/types';
import { OrderStatus } from '../order-status';

export const columns: ColumnDef<OrderTableItem>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Дата заказа',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: 'number',
    header: 'Номер заказа',
    cell: ({ row }) => {
      return (
        <Link
          to={href(ROUTES.orders.byId, { id: row.original.id })}
          className="font-semibold text-wrap hover:underline"
        >
          {row.original.number}
        </Link>
      );
    },
  },
  {
    accessorKey: 'customerName',
    header: 'Имя клиента',
  },
  {
    accessorKey: 'customerPhone',
    header: 'Телефон клиента',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Сумма заказа',
    cell: ({ row }) => {
      return formatPrice(row.original.totalPrice);
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус заказа',
    cell: ({ row }) => {
      return (
        <OrderStatus
          status={row.original.status}
          className="max-w-48 h-9 w-full rounded-md"
        />
      );
    },
  },
];
