export interface Product {
  id: string;
  name: string;
  code: string;
  status: ProductStatus;
  price: number;
  weight: number;
  packageQuantity: number;
  description: string;
  specifications: ProductSpecification[];
  imageUrls: string[];
  categories: ProductCategory[];
  variants: ProductVariant[];
}

export interface ProductVariant {
  createdAt: Date;
  id: string;
  slug: string;
  code: string;
  status: ProductStatus;
  price: number;
  imageUrls: string[];
  specifications: ProductSpecification[];
  minSaleQuantity: number;
  attributes: ProductAttribute[];
}

export interface ProductAttribute {
  value: string;
  measurementNameId: string;
  measurementName: string;
  measurementUnitId?: string;
  measurementUnit?: string;
}

export interface Measurement {
  id: string;
  name: string;
}

export interface MeasurementUnit {
  id: string;
  name: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: Omit<ProductCategory, 'children'>[];
}

export interface AddProduct {
  name: string;
  code: string;
  price: number;
  weight: number;
  packageQuantity: number;
  description: string | null;
  specifications: ProductSpecification[];
  imageUrls: string[];
  categoryIds: string[];
}

export interface UpdateProduct {
  id: string;
  name: string;
  description: string | null;
  specifications: ProductSpecification[];
  categoryIds: string[];
  variants: UpdateProductVariant[];
}

export interface UpdateProductVariant {
  id?: string;
  status: ProductStatus;
  price: number;
  imageUrls: string[];
  specifications: ProductSpecification[];
  minSaleQuantity: number;
  attributes: {
    value: string;
    measurementNameId: string;
    measurementUnitId?: string;
  }[];
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export type ProductStatus = 'IN_SALE' | 'ARCHIVED' | 'DRAFT';

export interface ProductsParams {
  categorySlug?: string;
  sort?: 'createdAt' | 'price';
  order?: 'asc' | 'desc';
  query?: string;
  limit?: number;
}
