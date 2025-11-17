import { href, Link } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';

import { formatPrice } from '@/shared/lib/format-price';
import { ROUTES } from '@/shared/routes';

import type { Order } from '../../model/types';
import { StatusSelector } from '../status-selector';

export const columns: ColumnDef<Order>[] = [
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
        <StatusSelector
          orderId={row.original.id}
          currentStatus={row.original.status}
          className="max-w-48 w-full"
        />
      );
    },
  },
];
