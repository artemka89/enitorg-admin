import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { useGetCategories } from '../model/use-get-categories';

interface CategorySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  value,
  onValueChange,
  className,
}) => {
  const { data } = useGetCategories();

  const handleCategoryChange = (slug: string) => {
    onValueChange(slug);
  };

  return (
    <div className={cn(className)}>
      <Label className="mb-2">Категории:</Label>
      <Select value={value} onValueChange={handleCategoryChange}>
        <SelectTrigger className="min-w-[180px] cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={'all'} className="cursor-pointer">
            Все
          </SelectItem>
          {data?.items.map((category) => (
            <div key={category.id}>
              <SelectItem
                value={category.slug}
                className="cursor-pointer bg-primary/30 my-1"
              >
                {category.name}
              </SelectItem>
              {category.children?.map((child) => {
                return (
                  <SelectItem
                    key={child.id}
                    value={child.slug}
                    className="cursor-pointer pl-6"
                  >
                    {child.name}
                  </SelectItem>
                );
              })}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
