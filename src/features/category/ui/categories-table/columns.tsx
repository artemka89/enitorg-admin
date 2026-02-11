import { href, Link } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';
import { ChevronRight, CornerDownRight } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';

import { type Category } from '../../model/types';

import { RowDragHandleCell } from './row-drag-handle-cell';

export const columns: ColumnDef<Category>[] = [
  {
    id: 'drag-handle',
    cell: ({ row }) => {
      const subRowsLength = row.getParentRow()?.subRows.length || 0;

      if (row.depth > 0 && subRowsLength < 2) return null;

      if (row.depth > 0) {
        return (
          <div className="w-4 ml-auto">
            <RowDragHandleCell rowId={row.id} />
          </div>
        );
      }

      return (
        <div className="w-4">
          <RowDragHandleCell rowId={row.id} />
        </div>
      );
    },
  },
  {
    id: 'expander',
    cell: ({ row }) => {
      return (
        <div className="w-4">
          {row.getCanExpand() && (
            <Button
              variant="ghost"
              size="icon-sm"
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
            >
              <ChevronRight
                className={cn('transition-transform duration-300', {
                  'rotate-90': row.getIsExpanded(),
                })}
              />
            </Button>
          )}
          {row.depth > 0 && (
            <div className="p-2 size-8">
              <CornerDownRight className="size-4 text-muted-foreground" />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => {
      return (
        <div className={cn('min-w-2xs', { 'pl-4': row.depth > 0 })}>
          <Link
            to={href(ROUTES.categories.byId, { id: row.original.id })}
            className="font-semibold hover:underline"
          >
            {row.getValue('name')}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'slug',
    header: 'URL-адрес(slug)',
    cell: ({ row }) => {
      return <div className="min-w-2xs">{row.getValue('slug')}</div>;
    },
  },
  {
    accessorKey: 'totalProducts',
    header: 'Кол-во товаров',
  },
];
