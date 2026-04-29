export interface Category {
  id: string;
  name: string;
  slug: string;
  totalProducts: number;
  order: number;
  parentId: string | null;
  seoTitle: string;
  seoH1: string;
  seoDescription: string;
  children?: Omit<Category, 'children'>[];
}

export interface CreateCategory {
  name: string;
  parentId: string | null;
  seoTitle: string;
  seoH1: string;
  seoDescription: string;
}

export interface UpdateCategory {
  id: string;
  name: string;
  parentId: string | null;
  seoTitle: string;
  seoH1: string;
  seoDescription: string;
}
