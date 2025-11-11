import 'react-router';

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  products: {
    base: '/products',
    byId: (id?: string) => `/products/${id}`,
    uploadImage: '/products/upload-image',
  },
  categories: {
    base: '/categories',
    byId: (id: string) => `/categories/${id}`,
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
    byId: '/categories/:id',
    add: '/categories/add',
  },
} as const;

export type PathParams = {
  [ROUTES.products.byId]: {
    id: string;
  };
  [ROUTES.categories.byId]: {
    id: string;
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
