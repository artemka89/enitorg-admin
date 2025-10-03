import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ className, children }) => {
  return <div className={cn('mx-auto px-4', className)}>{children}</div>;
};
