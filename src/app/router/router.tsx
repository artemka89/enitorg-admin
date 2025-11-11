import { createBrowserRouter } from 'react-router';

import { AddCategoryPage } from '@/pages/add-category-page';
import { CategoriesPage } from '@/pages/categories-page';
import { CategoryPage } from '@/pages/category-page';
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
        element: <div>Product</div>,
      },
      { path: ROUTES.products.add, element: <div>Add Product</div> },
      { path: ROUTES.categories.base, element: <CategoriesPage /> },
      {
        path: ROUTES.categories.byId,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.categories.add,
        element: <AddCategoryPage />,
      },
      { path: '*', element: <div>Страница не найдена</div> },
    ],
  },
]);
