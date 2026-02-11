import { type FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';

import { Button } from '@/shared/ui/button';

interface RowDragHandleCellProps {
  rowId: string;
}

export const RowDragHandleCell: FC<RowDragHandleCellProps> = ({ rowId }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <Button
      variant="ghost"
      size="icon"
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <GripVertical />
    </Button>
  );
};
