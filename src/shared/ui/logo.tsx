import { type FC } from 'react';
import { Link } from 'react-router';

import { cn } from '@/shared/lib/cn';

import { ROUTES } from '../routes';

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: FC<LogoProps> = ({ theme = 'light', className }) => {
  return (
    <div className={cn('text-3xl', className)}>
      <Link to={ROUTES.home}>
        <div className="flex items-center">
          <span
            className={cn(
              { ['text-secondary-foreground']: theme === 'light' },
              { ['text-secondary']: theme === 'dark' },
              'font-bold',
            )}
          >
            ENI
          </span>
          <span className="text-primary font-normal">ТОРГ</span>
        </div>
      </Link>
    </div>
  );
};
