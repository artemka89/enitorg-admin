import { href, Link } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';

import { ROUTES } from '@/shared/routes';

import { type Category } from '../../model/types';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => {
      return (
        <Link
          to={href(ROUTES.categories.byId, { id: row.original.id })}
          className="font-semibold hover:underline"
        >
          {row.getValue('name')}
        </Link>
      );
    },
  },
  {
    accessorKey: 'slug',
    header: 'URL-адрес(slug)',
  },
  {
    accessorKey: 'children',
    header: 'Подкатегории',
    cell: ({ row }) => {
      return (
        <ul className="text-wrap">
          {row.original.children?.map((child) => (
            <li key={child.id}>
              <Link
                to={href(ROUTES.categories.byId, { id: row.original.id })}
                className="font-semibold text-wrap hover:underline"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: 'totalProducts',
    header: 'Кол-во товаров',
  },
];
