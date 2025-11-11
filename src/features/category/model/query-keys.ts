export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
  byId: (id: string) => [...categoryKeys.all, 'one', id] as const,
};
