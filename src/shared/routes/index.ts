import 'react-router';

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  products: {
    base: '/admin/products',
    byId: (id?: string) => `/admin/products/${id}`,
    uploadImage: '/admin/products/upload-image',
    checkCode: (code: string) => `/admin/products/check-code/${code}`,
    generateCode: '/admin/products/generate-code',
    delete: (id: string) => `/admin/products/${id}`,
    moveVariant: '/admin/products/move-variant',
    updatePrice: (id: string) => `/admin/products/${id}/update-price`,
  },
  categories: {
    base: '/categories',
    byId: (id: string) => `/categories/${id}`,
    updateOrders: '/categories/update-order',
  },
  orders: {
    base: '/admin/orders',
    byId: (id: string) => `/admin/orders/${id}`,
    updateStatus: (id: string) => `/admin/orders/${id}/status`,
  },
  measurements: {
    base: '/admin/measurements',
    byId: (id: string) => `/admin/measurements/${id}`,
    add: '/admin/measurements',
    update: (id: string) => `/admin/measurements/${id}`,
    addUnit: '/admin/measurements/unit',
    updateUnit: (id: string) => `/admin/measurements/unit/${id}`,
  },
} as const;

export const ROUTES = {
  home: '/',
  login: {
    base: '/login',
  },
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
  orders: {
    base: '/orders',
    byId: '/orders/:id',
  },
} as const;

export type PathParams = {
  [ROUTES.products.byId]: {
    id: string;
  };
  [ROUTES.categories.byId]: {
    id: string;
  };
  [ROUTES.orders.byId]: {
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
