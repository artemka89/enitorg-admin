import {
  FolderTree,
  ImageIcon,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { ROUTES } from '@/shared/routes';

export const MENU_ITEMS = [
  {
    title: 'Дашборд',
    href: ROUTES.home,
    icon: LayoutDashboard,
  },
  {
    title: 'Баннеры',
    href: '/banners',
    icon: ImageIcon,
  },
  {
    title: 'Пользователи',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Продукты',
    href: ROUTES.products.base,
    icon: Package,
  },
  {
    title: 'Категории',
    href: ROUTES.categories.base,
    icon: FolderTree,
  },
  {
    title: 'Заказы',
    href: '/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Настройки',
    href: '/settings',
    icon: Settings,
  },
];
