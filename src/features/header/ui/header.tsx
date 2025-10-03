import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(className, 'h-16 bg-primary-foreground flex items-center')}
    ></header>
  );
};
