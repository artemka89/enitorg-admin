import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown, Plus } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { CategorySelector } from '@/features/category';
import { cn } from '@/shared/lib/cn';
import { Button, buttonVariants } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SearchField } from '@/shared/ui/search-field';
import { SortSelect } from '@/shared/ui/sort-select/sort-select';
import { useSort } from '@/shared/ui/sort-select/use-sort';
import { Spinner } from '@/shared/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

import { useGetProducts } from '../../model/use-get-products';

import { columns } from './columns';

export const ProductsTable = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    image: false,
  });

  const { value, sort, order, onChangeSort } = useSort();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchValue, setSearchValue] = useQueryState('query', {
    defaultValue: '',
  });

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetProducts({
    sort,
    order,
    query: searchValue,
    categorySlug: currentCategory === 'all' ? undefined : currentCategory,
  });

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.items) || [],
    [data?.pages],
  );

  const table = useReactTable({
    data: products || [],
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
        <Link
          to="/admin/products/add"
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus />
          <span>Добавить товары</span>
        </Link>
        <SearchField
          defaultValue={searchValue}
          onSearch={setSearchValue}
          onCancel={() => setSearchValue('')}
        />

        <SortSelect value={value} onValueChange={onChangeSort} />

        <CategorySelector
          value={currentCategory}
          onValueChange={setCurrentCategory}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <span>Колонки</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Показать еще
        </Button>
      </div>
    </>
  );
};
