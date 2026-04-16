import { href, Link } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';

import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';
import { ROUTES } from '@/shared/routes';

import { type Product } from '../../model/types';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'updatedAt',
    header: 'Обновлено',
    cell: ({ row }) => formatDate(row.getValue('updatedAt')),
  },
  {
    accessorKey: 'image',
    header: 'Изобр.',
    cell: ({ row }) => {
      return (
        <div className="relative size-16 overflow-hidden rounded-xl">
          <img
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'code',
    header: 'Код',
  },
  {
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => (
      <Link
        to={href(ROUTES.products.byId, { id: row.original.id })}
        className="font-semibold text-wrap hover:underline"
      >
        {row.getValue('name')}
      </Link>
    ),
  },
  {
    accessorKey: 'categories',
    header: 'Категории',
    cell: ({ row }) => {
      return (
        <ul>
          {row.original.categories.map((category) => (
            <li key={category.id}>
              <Link
                to={href(ROUTES.categories.byId, { id: category.id })}
                className="font-semibold text-wrap hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: ({ row }) => formatPrice(row.getValue('price')),
  },
];
