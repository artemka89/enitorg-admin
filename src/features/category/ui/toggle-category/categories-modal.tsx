'use client';

import { type FC, useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/dialog';

import { useGetCategories } from '../../model/use-get-categories';

import { SelectedCategoryNames } from './selected-category-names';
import { ToggleCategory } from './toggle-category';

interface CategoriesModalProps {
  selectedCategories: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const CategoriesModal: FC<CategoriesModalProps> = ({
  selectedCategories,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories } = useGetCategories();

  if (!categories) return null;

  return (
    <>
      <div className="flex gap-2">
        <Button type="button" onClick={() => setIsOpen(true)}>
          Выбрать категории
        </Button>
        <SelectedCategoryNames
          items={categories.items}
          selectedIds={selectedCategories}
          onDelete={onSelectionChange}
        />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-4xl" showCloseButton={false}>
          <DialogTitle>Выбор категорий</DialogTitle>
          <DialogDescription aria-describedby={undefined} />
          <ToggleCategory
            categories={categories.items}
            selectedCategories={selectedCategories}
            onSelectionChange={onSelectionChange}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
