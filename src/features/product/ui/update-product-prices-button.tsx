'use client';

import type { FC } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';

export const UpdateProductPricesButton: FC = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(ROUTES.products.updatePrices)}>
      Обновить цены
    </Button>
  );
};
