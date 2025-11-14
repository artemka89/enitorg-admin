import { type FC, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
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
import { useUpdateOrderCategories } from '../../model/use-update-order-categories';

import { columns } from './columns';
import { DraggableRow } from './draggable-row';

export const CategoriesTable: FC = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { data: categories, isLoading } = useGetCategories();
  const { mutate: updateOrder } = useUpdateOrderCategories();

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => categories?.items.map(({ id }) => id) || [],
    [categories?.items],
  );

  const table = useReactTable({
    data: categories?.items || [],
    columns,
    getRowId: (row) => row.id,
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id as string);
      const newIndex = dataIds.indexOf(over.id as string);

      updateOrder({ oldIndex, newIndex });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
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
    </DndContext>
  );
};
