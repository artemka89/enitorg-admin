export interface Category {
  id: string;
  name: string;
  slug: string;
  totalProducts: number;
  order: number;
  parentId: string | null;
  children?: Omit<Category, 'children'>[];
}

export interface CreateCategory {
  name: string;
  parentId: string | null;
}

export interface UpdateCategory {
  id: string;
  name: string;
  parentId: string | null;
}
