import z from 'zod';

export const AddCategorySchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Имя должно быть не менее 2 символов' })
    .max(50, { error: 'Имя должно быть не более 50 символов' }),
  slug: z
    .string()
    .min(2, { error: 'URL-адрес должен быть не менее 2 символов' })
    .max(50, { error: 'URL-адрес должен быть не более 50 символов' }),
  parentId: z.string().optional(),
});

export type AddCategorySchema = z.infer<typeof AddCategorySchema>;
