import { type FC } from 'react';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';

import { MENU_ITEMS } from '../model/constants';

import { MenuLink } from './menu-link';

interface SideBarProps {
  collapsed?: boolean;
  setCollapsed: (value: boolean) => void;
  className?: string;
}

export const SideBar: FC<SideBarProps> = ({
  collapsed,
  setCollapsed,
  className,
}) => {
  return (
    <aside
      className={cn(
        className,
        'gap-2 fixed top-0 left-0 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300 w-64',
        { ['w-16']: collapsed },
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4 overflow-hidden">
        <Logo isSmall={collapsed} />
      </div>
      <nav className="flex-1 px-2 overflow-hidden">
        {MENU_ITEMS.map((item) => (
          <div key={item.href}>
            <MenuLink key={item.href} to={item.href} className="w-full">
              <item.icon />
              {!collapsed && <span>{item.title}</span>}
            </MenuLink>
          </div>
        ))}
      </nav>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'absolute bottom-10 -right-8 rounded-full',
        )}
      >
        <ChevronRight
          className={cn('transition-transform duration-300 rotate-0', {
            ['rotate-180']: !collapsed,
          })}
        />
      </Button>
    </aside>
  );
};
