import { type FC } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { type ProductCategory } from '../../../product/model/types';

interface SelectedCategoryNamesProps {
  items: ProductCategory[];
  selectedIds: string[];
  onDelete: (ids: string[]) => void;
  className?: string;
}

export const SelectedCategoryNames: FC<SelectedCategoryNamesProps> = ({
  items,
  selectedIds,
  onDelete,
  className,
}) => {
  const getCategoryName = (id: string): string => {
    const name =
      items.find((category) => category.id === id)?.name ||
      items
        .flatMap((category) => category.children)
        .find((category) => category?.id === id)?.name;

    return name || id;
  };

  const handleDelete = (id: string) => {
    onDelete(selectedIds.filter((i) => i !== id));
  };

  return (
    <div className={cn(className, 'flex flex-wrap items-center gap-2')}>
      {selectedIds.map((id) => (
        <Badge
          key={id}
          variant="secondary"
          className="flex h-9 items-center gap-1"
        >
          {getCategoryName(id)}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => handleDelete(id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
};
