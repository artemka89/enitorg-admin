import type { FC } from 'react';

import { AddCategoryForm } from '@/features/category';
import { BackButton } from '@/shared/ui/back-button';
import { Typography } from '@/shared/ui/typography';

export const AddCategoryPage: FC = () => {
  return (
    <div className="container mx-auto">
      <BackButton className="mb-4" />
      <div className="mb-4">
        <Typography size="3xl" weight="semibold">
          Добавление Категории
        </Typography>
        <Typography className="text-muted-foreground mt-2">
          Добавьте категорию в систему
        </Typography>
      </div>
      <AddCategoryForm />
    </div>
  );
};
