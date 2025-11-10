import { type FC } from 'react';
import { LogOut } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

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
        <div className="self-end">
          <Button variant="outline">
            <LogOut />
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};
