import 'react-router';

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  products: {
    base: '/admin/products',
    uploadImage: '/api/admin/products/upload-image',
  },
  categories: {
    base: '/admin/categories',
  },
} as const;

export const ROUTES = {
  home: '/',
  products: {
    base: '/admin/products',
    byId: '/admin/products/:id',
    add: '/admin/products/add',
  },
  categories: {
    base: '/admin/categories',
    bySlug: '/admin/categories/:slug',
    add: '/admin/categories/add',
  },
} as const;

export type PathParams = {
  [ROUTES.products.byId]: {
    id: string;
  };
  [ROUTES.categories.bySlug]: {
    slug: string;
  };
};

declare module 'react-router' {
  interface Register {
    pages: {
      [K in keyof PathParams]: {
        params: PathParams[K];
      };
    };
  }
}
