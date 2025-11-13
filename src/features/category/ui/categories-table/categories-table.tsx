import { type FC, useState } from 'react';
import { Link } from 'react-router';
import {
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { buttonVariants } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

import { useGetCategories } from '../../model/use-get-categories';

import { columns } from './columns';

interface CategoriesTableProps {
  className?: string;
}

export const CategoriesTable: FC<CategoriesTableProps> = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { data: categories, isLoading } = useGetCategories();

  const table = useReactTable({
    data: categories?.items || [],
    columns,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnVisibility,
      expanded,
    },
  });

  return (
    <>
      <div className="flex items-center gap-4 pb-4">
        <Link
          to={ROUTES.categories.add}
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus />
          <span>Добавить категорию</span>
        </Link>
      </div>
      <div className="overflow-hidden border">
        <Table className={cn({ 'h-full': isLoading })}>
          <TableHeader className="sticky top-0 bg-secondary z-50 shadow-xl">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-full">
                {isLoading ? (
                  <TableCell colSpan={columns.length} className="bg-muted">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                ) : (
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Таблица пустая
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
