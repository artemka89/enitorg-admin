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

import { cn } from '@/shared/lib/cn';

import { SortableImageCard } from './sortable-image-card';

interface SortableImagePreviewsProps {
  imageUrls: string[];
  onImagesChange: (urls: string[]) => void;
  className?: string;
}

export const SortableImagePreviews: FC<SortableImagePreviewsProps> = ({
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
    const filteredUrls = imageUrls.filter((prevUrl) => prevUrl !== url);
    onImagesChange(filteredUrls);
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
        <div className={cn(className, 'flex items-center flex-wrap gap-2')}>
          {imageUrls.map((url) => (
            <SortableImageCard
              key={url}
              url={url}
              onRemove={handleRemoveImage}
              className="max-w-44 w-full"
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
