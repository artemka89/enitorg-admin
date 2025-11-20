import { type FC } from 'react';

import { GreeningUser, LogoutButton } from '@/features/auth';
import { cn } from '@/shared/lib/cn';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        className,
        'h-16 dark:bg-sidebar bg-primary flex items-center ',
      )}
    >
      <div className="flex items-center justify-between w-full gap-4 px-4">
        <div></div>
        <div className="self-end flex items-center gap-4">
          <GreeningUser className="text-secondary font-semibold" />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
