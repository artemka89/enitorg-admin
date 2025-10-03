import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';

interface ProductsPageProps {
  className?: string;
}

export const ProductsPage: FC<ProductsPageProps> = ({ className }) => {
  return <div className={cn(className)}>ProductsPage</div>;
};
