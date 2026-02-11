export const categoryKeys = {
  all: ['categories'] as const,
  list: (onlyParents: boolean | null = null) =>
    [...categoryKeys.all, 'list', onlyParents] as const,
  byId: (id: string) => [...categoryKeys.all, 'one', id] as const,
};
