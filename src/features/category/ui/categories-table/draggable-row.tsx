import type { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, type Row } from '@tanstack/react-table';

import { TableCell, TableRow } from '@/shared/ui/table';

import type { Category } from '../../model/types';

export const DraggableRow = ({ row }: { row: Row<Category> }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
    data: {
      parentId: row.original.parentId,
      hasChildren: !!row.original.children?.length,
    },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };
  return (
    <TableRow
      ref={setNodeRef}
      key={row.id}
      data-state={row.getIsSelected() && 'selected'}
      style={style}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};
