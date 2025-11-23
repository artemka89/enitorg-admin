import type { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

interface SortableImageCardProps {
  url: string;
  onRemove: (url: string) => void;
  className?: string;
}

export const SortableImageCard: FC<SortableImageCardProps> = ({
  className,
  url,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: url,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };

  return (
    <Card style={style} className={cn(className, 'group relative p-0')}>
      <CardContent className="p-0">
        <div
          ref={setNodeRef}
          className="relative aspect-square overflow-hidden rounded-md cursor-move"
          {...attributes}
          {...listeners}
        >
          <img
            src={url}
            alt={url}
            className="h-full w-full object-contain aspect-square rounded-md"
          />
        </div>
        <Button
          type="button"
          size="sm"
          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 transition-all group-hover:opacity-100 bg-red-400 hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(url);
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};
