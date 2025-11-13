export interface Category {
  id: string;
  name: string;
  slug: string;
  totalProducts: number;
  order: number;
  parentId?: string;
  children?: Omit<Category, 'children'>[];
}

export interface CreateCategory {
  name: string;
  slug: string;
  parentId?: string;
  order: number;
}

export interface UpdateCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
  parentId?: string;
}
