import type { FC } from 'react';

import { Button } from '@/shared/ui/button';

import { useUpdateProductExports } from '../model/use-update-product-exports';

export const UpdateProductExportsButton: FC = () => {
  const { mutate: updateExports } = useUpdateProductExports();

  return <Button onClick={() => updateExports()}>Обновить</Button>;
};
