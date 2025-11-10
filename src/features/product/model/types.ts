export interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  weight: number;
  packageQuantity: number;
  description: string | null;
  specifications: { name: string; value: string }[];
  imageUrls: string[];
  categories: ProductCategory[];
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: Omit<ProductCategory, 'children'>[];
}

export interface CreateProduct {
  name: string;
  code: string;
  price: number;
  weight: number;
  packageQuantity: number;
  description: string | null;
  specifications: { name: string; value: string }[];
  imageUrls: string[];
  categoryIds: string[];
}

export interface UpdateProduct {
  id: string;
  name: string;
  code: string;
  price: number;
  weight: number;
  packageQuantity: number;
  description: string | null;
  specifications: { name: string; value: string }[];
  imageUrls: string[];
  categoryIds: string[];
}

export interface ProductsParams {
  categorySlug?: string;
  sort?: 'createdAt' | 'price';
  order?: 'asc' | 'desc';
  query?: string;
  limit?: number;
}
