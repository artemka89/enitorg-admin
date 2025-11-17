import { createBrowserRouter } from 'react-router';

import { AddCategoryPage } from '@/pages/add-category-page';
import { AddProductPage } from '@/pages/add-product-page';
import { CategoriesPage } from '@/pages/categories-page';
import { CategoryPage } from '@/pages/category-page';
import { OrderPage } from '@/pages/order-page';
import { ProductPage } from '@/pages/product-page';
import { ROUTES } from '@/shared/routes';

import { HomePage } from '../../pages/home-page';
import { ProductsPage } from '../../pages/products-page';
import RootLayout from '../layouts/root-layout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      {
        path: ROUTES.products.base,
        element: <ProductsPage />,
      },
      {
        path: ROUTES.products.byId,
        element: <ProductPage />,
      },
      { path: ROUTES.products.add, element: <AddProductPage /> },
      { path: ROUTES.categories.base, element: <CategoriesPage /> },
      {
        path: ROUTES.categories.byId,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.categories.add,
        element: <AddCategoryPage />,
      },
      {
        path: ROUTES.orders.base,
        element: <OrderPage />,
      },
      { path: '*', element: <div>Страница не найдена</div> },
    ],
  },
]);
