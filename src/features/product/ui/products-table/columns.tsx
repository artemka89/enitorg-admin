import { Link } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';

import { formatPrice } from '@/shared/lib/format-price';
import { API_ROUTES } from '@/shared/routes';

import { type Product } from '../../model/types';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'Изобр.',
    cell: ({ row }) => {
      return (
        <div className="relative size-16 overflow-hidden rounded-xl">
          <img
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        to={API_ROUTES.products.byId(row.original.id)}
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
      const categories = row.original.categories.map(
        (category) => category.name,
      );

      return (
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: 'packageQuantity',
    header: 'Кол. в уп.',
  },
  {
    accessorKey: 'weight',
    header: 'Вес гр.',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: ({ row }) => formatPrice(row.getValue('price')),
  },
];
