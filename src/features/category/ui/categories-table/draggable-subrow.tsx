import type { CSSProperties, FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, type Row } from '@tanstack/react-table';

import { TableCell, TableRow } from '@/shared/ui/table';

import type { Category } from '../../model/types';

interface DraggableSubRowProps {
  row: Row<Omit<Category, 'children'>>;
  parentId: string;
}

export const DraggableSubRow: FC<DraggableSubRowProps> = ({
  row,
  parentId,
}) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: `${parentId}-${row.original.id}`,
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
