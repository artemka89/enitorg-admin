import type { FC } from 'react';

import { UpdateProductExportsButton } from '@/features/product';

export const SettingsPage: FC = () => {
  return (
    <div className="flex items-center gap-2">
      Обновить талицы экспортов:
      <UpdateProductExportsButton />
    </div>
  );
};
