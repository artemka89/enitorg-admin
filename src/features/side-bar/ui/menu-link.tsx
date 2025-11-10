import { type FC } from 'react';
import { NavLink } from 'react-router';

import { cn } from '@/shared/lib/cn';

interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const MenuLink: FC<MenuLinkProps> = ({ children, to, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          className,
          'justify-start inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 h-10 rounded-md px-6 has-[>svg]:px-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all',

          {
            ['text-secondary dark:text-secondary-foreground bg-primary']:
              isActive,
            ['hover:bg-secondary-foreground/10 hover:text-secondary-foreground dark:hover:bg-secondary/50 dark:hover:text-secondary-foreground']:
              !isActive,
          },
        )
      }
    >
      {children}
    </NavLink>
  );
};
