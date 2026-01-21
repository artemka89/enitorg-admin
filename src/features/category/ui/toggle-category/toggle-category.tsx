import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

import type { Category } from '../../model/types';

import { SelectedCategoryNames } from './selected-category-names';

interface ToggleCategoryProps {
  categories: Category[];
  selectedCategories: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const ToggleCategory: React.FC<ToggleCategoryProps> = ({
  categories,
  selectedCategories,
  onSelectionChange,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const isCategorySelected = (categoryId: string): boolean => {
    return selectedCategories.includes(categoryId);
  };

  const isCategoryWithChildren = (category: Category): boolean => {
    return category.children ? category.children.length > 0 : false;
  };

  const handleSelectCategory = ({
    id,
    parentId,
  }: {
    id: string;
    parentId: string | null;
  }) => {
    let newSelectedCategories = [];

    if (isCategorySelected(id)) {
      newSelectedCategories = selectedCategories.filter(
        (categoryId) => categoryId !== id,
      );
    } else {
      if (parentId && !isCategorySelected(parentId)) {
        newSelectedCategories = [...selectedCategories, id, parentId];
      } else {
        newSelectedCategories = [...selectedCategories, id];
      }
    }

    onSelectionChange(newSelectedCategories);
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <SelectedCategoryNames
          items={categories}
          selectedIds={selectedCategories}
          onDelete={onSelectionChange}
        />
      </div>
      <div className="flex h-[600px] flex-col gap-2 overflow-y-auto">
        {categories.map((category) => (
          <div key={category.id}>
            <div
              className={cn(
                'hover:bg-accent flex h-9 cursor-pointer items-center rounded-md border px-2',
                {
                  ['bg-primary/10 border-primary']: isCategorySelected(
                    category.id,
                  ),
                  ['px-0']: isCategoryWithChildren(category),
                },
              )}
            >
              {isCategoryWithChildren(category) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => toggleExpand(category.id)}
                  className="h-8"
                >
                  {expandedCategories.has(category.id) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
              )}
              <div
                onClick={() => handleSelectCategory(category)}
                className="flex h-full flex-1 items-center font-semibold"
              >
                {category.name}
              </div>
            </div>
            {expandedCategories.has(category.id) && (
              <div className="mt-2 ml-6 flex flex-col gap-1">
                {category.children?.map((child) => (
                  <div
                    key={child.id}
                    onClick={() => handleSelectCategory(child)}
                    className={cn(
                      'hover:bg-accent flex h-9 cursor-pointer items-center rounded-md border px-2',
                      {
                        ['bg-primary/10 border-primary']: isCategorySelected(
                          child.id,
                        ),
                      },
                    )}
                  >
                    {child.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
