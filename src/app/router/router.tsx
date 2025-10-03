import { createBrowserRouter } from 'react-router';

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
      { path: ROUTES.categories.base, element: <div>Categories</div> },
      {
        path: ROUTES.categories.bySlug,
        element: <div>Category</div>,
      },
      {
        path: ROUTES.categories.add,
        element: <div>Add Category</div>,
      },
    ],
  },
]);
