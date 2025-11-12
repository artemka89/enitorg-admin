import type { FC } from 'react';
import { useParams } from 'react-router';

import { EditProductForm } from '@/features/product';
import { BackButton } from '@/shared/ui/back-button';
import { Typography } from '@/shared/ui/typography';

export const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <div className="container mx-auto">
      <BackButton className="mb-4" />
      <div className="mb-4">
        <Typography size="3xl" weight="semibold">
          Редактирование товара
        </Typography>
        <Typography className="text-muted-foreground mt-2">
          Редактируйте товар в системе
        </Typography>
      </div>
      <EditProductForm id={id} />
    </div>
  );
};
