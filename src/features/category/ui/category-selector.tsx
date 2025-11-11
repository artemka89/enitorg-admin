import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';
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
    <div className={cn(className, 'flex items-center gap-x-2')}>
      <p>Категории:</p>
      <Select value={value} onValueChange={handleCategoryChange}>
        <SelectTrigger className="min-w-[180px] cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'all'} className="cursor-pointer">
            Все
          </SelectItem>
          {data?.items.map((category) => (
            <div key={category.id}>
              <SelectItem value={category.slug} className="cursor-pointer">
                {category.name}
              </SelectItem>
              <div className="ml-3">
                {category.children?.map((child) => {
                  return (
                    <SelectItem
                      key={child.id}
                      value={child.slug}
                      className="cursor-pointer"
                    >
                      {child.name}
                    </SelectItem>
                  );
                })}
              </div>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
