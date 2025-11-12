import type { FC } from 'react';

import { AddProductsForm } from '@/features/product';
import { BackButton } from '@/shared/ui/back-button';
import { Typography } from '@/shared/ui/typography';

export const AddProductPage: FC = () => {
  return (
    <div className="container mx-auto">
      <BackButton className="mb-4" />
      <div className="mb-4">
        <Typography size="3xl" weight="semibold">
          Добавление товаров
        </Typography>
        <Typography className="text-muted-foreground mt-2">
          Добавьте один или несколько товаров в систему
        </Typography>
      </div>
      <AddProductsForm />
    </div>
  );
};
