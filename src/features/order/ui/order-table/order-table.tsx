import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useQueryState } from 'nuqs';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { SearchField } from '@/shared/ui/search-field';
import { Spinner } from '@/shared/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

import { useGetOrders } from '../../model/use-get-orders';

import { columns } from './columns';

export const ProductsTable = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    image: false,
  });

  const [searchValue, setSearchValue] = useQueryState('query', {
    defaultValue: '',
  });

  const { data: orders, isLoading } = useGetOrders();

  const table = useReactTable({
    data: orders?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    state: {
      columnVisibility,
    },
  });

  return (
    <>
      <div className="flex items-center gap-4 pb-4">
        <SearchField
          defaultValue={searchValue}
          onSearch={(value) => setSearchValue(value)}
        />
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

          <TableBody className="overflow-y-auto">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          // disabled={!hasNextPage}
        >
          Показать еще
        </Button>
      </div>
    </>
  );
};
