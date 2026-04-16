import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown, Plus } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';

import { CategorySelector } from '@/features/category';
import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button, buttonVariants } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Label } from '@/shared/ui/label';
import { SearchField } from '@/shared/ui/search-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { SortSelect } from '@/shared/ui/sort-select/sort-select';
import type { CurrentSortValue } from '@/shared/ui/sort-select/types';
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

import type { ProductStatus } from '../../model/types';
import { useGetProducts } from '../../model/use-get-products';

import { columns } from './columns';

export const ProductsTable = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const bottomControlsRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState('auto');

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    image: false,
    updatedAt: false,
  });

  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum(['IN_SALE', 'ARCHIVED', 'DRAFT', 'ALL']).withDefault(
      'ALL',
    ),
  );

  const { sort, order, onChangeSort } = useSort();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchValue, setSearchValue] = useQueryState('query', {
    defaultValue: '',
  });

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetProducts({
    sort,
    order,
    status: status === 'ALL' ? undefined : status,
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

  const handleChangeStatus = (value: ProductStatus) => {
    setStatus(value);
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (tableContainerRef.current && bottomControlsRef.current) {
        const tableContainerTop =
          tableContainerRef.current.getBoundingClientRect().top;
        const bottomControlsHeight =
          bottomControlsRef.current.getBoundingClientRect().height;
        const newHeight =
          window.innerHeight - tableContainerTop - bottomControlsHeight - 16;

        setTableHeight(`${newHeight}px`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex gap-4 pb-4 items-end">
        <Link
          to={ROUTES.products.add}
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

        <SortSelect
          value={`${sort}_${order}` as CurrentSortValue}
          onValueChange={onChangeSort}
        />

        <CategorySelector
          value={currentCategory}
          onValueChange={setCurrentCategory}
        />

        <div>
          <Label className="mb-2">Статус:</Label>
          <Select onValueChange={handleChangeStatus} value={status}>
            <SelectTrigger className="min-w-[130px]">
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">Все</SelectItem>
              <SelectItem value="IN_SALE">В продаже</SelectItem>
              <SelectItem value="ARCHIVED">В архиве</SelectItem>
              <SelectItem value="DRAFT">Черновик</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
      <div
        ref={tableContainerRef}
        className="overflow-hidden border"
        style={{ height: tableHeight }}
      >
        <Table
          containerClassName="overflow-auto h-full table-scrollbar"
          className={cn({
            'h-full': isLoading,
          })}
        >
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
      <div
        ref={bottomControlsRef}
        className="flex items-center justify-end space-x-2 py-4"
      >
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
