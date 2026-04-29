import type { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import type { ProductVariantSchema } from '../../model/product-form-schema';

interface SortableProductVariantItemProps {
  field: ProductVariantSchema & { key: string };
  index: number;
  getVariantTitle: (index: number) => string;
  setEditingVariantIndex: (index: number) => void;
  remove: (index: number) => void;
}

export const SortableProductVariantItem: FC<
  SortableProductVariantItemProps
> = ({ field, index, getVariantTitle, setEditingVariantIndex, remove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between gap-2"
    >
      <div
        className={cn(
          buttonVariants({ variant: 'outline', className: 'pl-1 pr-0 flex-1' }),
        )}
      >
        <span {...listeners} className="cursor-grab touch-none p-1">
          <GripVertical className="size-5" />
        </span>
        <Button
          variant="ghost"
          type="button"
          className="flex-1 justify-start truncate"
          onClick={() => setEditingVariantIndex(index)}
        >
          <Typography tag="p">{getVariantTitle(index)}</Typography>
        </Button>
      </div>
      {!field.id && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="text-destructive"
          disabled={!!field.id}
          onClick={() => remove(index)}
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  );
};
