import 'react-router';

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  products: {
    base: '/products',
    byId: (id?: string) => `/api/admin/products/${id}`,
    uploadImage: '/products/upload-image',
  },
  categories: {
    base: '/categories',
  },
} as const;

export const ROUTES = {
  home: '/',
  products: {
    base: '/products',
    byId: '/products/:id',
    add: '/products/add',
  },
  categories: {
    base: '/categories',
    bySlug: '/categories/:slug',
    add: '/categories/add',
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
