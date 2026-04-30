import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { type PaginatedResponse } from '@/shared/api/types';
import { API_ROUTES } from '@/shared/routes';

import {
  type AddProduct,
  type Product,
  type ProductsParams,
  type UpdateProduct,
} from './types';

export const productApi = {
  getAll: (params?: ProductsParams) => {
    return infiniteQueryOptions({
      queryKey: ['products', params],
      queryFn: ({ pageParam, signal }) =>
        apiClient<PaginatedResponse<Product>>({
          url: API_ROUTES.products.base,
          signal,
          params: {
            ...params,
            cursor: pageParam,
            limit: params?.limit || 20,
          },
        }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      placeholderData: keepPreviousData,
    });
  },
  getById: (id?: string) => {
    return queryOptions({
      queryKey: ['products', id],
      queryFn: ({ signal }) =>
        apiClient<Product>({ url: API_ROUTES.products.byId(id), signal }),
      enabled: !!id,
    });
  },
  addMany: (data: AddProduct[]) =>
    apiClient({
      url: API_ROUTES.products.base,
      method: 'POST',
      body: data,
    }),
  update: (data: UpdateProduct) => {
    const { id, ...product } = data;
    return apiClient({
      url: API_ROUTES.products.byId(id),
      method: 'PUT',
      body: product,
    });
  },
  updatePrice: (data: { id: string; price: number }) =>
    apiClient({
      url: API_ROUTES.products.updatePrice(data.id),
      method: 'PUT',
      body: {
        price: data.price,
      },
    }),
  uploadImage: (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    return apiClient<string>({
      url: API_ROUTES.products.uploadImage,
      method: 'POST',
      body: formData,
    });
  },
  checkCode: (code: string) => {
    return apiClient<{ exist: boolean }>({
      url: API_ROUTES.products.checkCode(code),
    });
  },
  generateCode: () => {
    return apiClient<{ code: string }>({
      url: API_ROUTES.products.generateCode,
    });
  },
  moveVariant: (data: { newProductId: string; variantId: string }) => {
    return apiClient({
      url: API_ROUTES.products.moveVariant,
      method: 'PUT',
      body: data,
    });
  },
  delete: (id: string) => {
    return apiClient({
      url: API_ROUTES.products.delete(id),
      method: 'DELETE',
    });
  },
};
