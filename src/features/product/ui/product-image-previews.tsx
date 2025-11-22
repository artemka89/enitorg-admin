import { type FC } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

interface SortableImageCardProps {
  url: string;
  onRemove: (url: string) => void;
}

const SortableImageCard: FC<SortableImageCardProps> = ({ url, onRemove }) => {
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
    <Card
      ref={setNodeRef}
      style={style}
      className="group relative p-0 cursor-move"
      {...attributes}
      {...listeners}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <img
            src={url}
            alt={url}
            className="h-full w-full object-contain aspect-square rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onRemove(url)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProductImagePreviewsProps {
  imageUrls: string[];
  onImagesChange: (urls: string[]) => void;
  className?: string;
}

export const ProductImagePreviews: FC<ProductImagePreviewsProps> = ({
  imageUrls,
  onImagesChange,
  className,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleRemoveImage = (url: string) => {
    onImagesChange(imageUrls.filter((prevUrl) => prevUrl !== url));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = imageUrls.findIndex((url) => url === active.id);
      const newIndex = imageUrls.findIndex((url) => url === over.id);

      const newImageUrls = arrayMove(imageUrls, oldIndex, newIndex);
      onImagesChange(newImageUrls);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={imageUrls} strategy={rectSortingStrategy}>
        <div className={cn(className, 'grid grid-cols-2 gap-4 md:grid-cols-5')}>
          {imageUrls.map((url) => (
            <SortableImageCard
              key={url}
              url={url}
              onRemove={handleRemoveImage}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
