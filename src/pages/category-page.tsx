import type { FC } from 'react';
import { useParams } from 'react-router';

import { UpdateCategoryForm } from '@/features/category';
import { BackButton } from '@/shared/ui/back-button';
import { Typography } from '@/shared/ui/typography';

export const CategoryPage: FC = () => {
  const params = useParams<{ id: string }>();

  if (!params.id) return null;

  return (
    <div className="container mx-auto">
      <BackButton className="mb-4" />
      <div className="mb-4">
        <Typography size="3xl" weight="semibold">
          Редактирование Категории
        </Typography>
        <Typography className="text-muted-foreground mt-2">
          Редактируйте категорию в системе
        </Typography>
      </div>
      <UpdateCategoryForm id={params.id} />
    </div>
  );
};
