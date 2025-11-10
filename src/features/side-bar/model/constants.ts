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
    href: '/admin/banners',
    icon: ImageIcon,
  },
  {
    title: 'Пользователи',
    href: '/admin/users',
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
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Настройки',
    href: '/admin/settings',
    icon: Settings,
  },
];
