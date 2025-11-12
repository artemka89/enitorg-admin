import z from 'zod';

export const ProductFormSchema = z.object({
  name: z.string().min(2, { error: 'Имя должно быть не менее 2 символов' }),
  code: z.string().min(5, { error: 'Код должен быть не менее 5 символа' }),
  price: z.number().positive({ error: 'Цена должна быть больше 0' }),
  weight: z.number(),
  packageQuantity: z.number().positive({
    error: 'Количество в упаковке должно быть больше 0',
  }),
  description: z.string(),
  specifications: z.array(
    z.object({
      name: z
        .string()
        .min(1, { error: 'Название характеристики не может быть пустым' }),
      value: z
        .string()
        .min(1, { error: 'Значение характеристики не может быть пустым' }),
    }),
  ),
  imageUrls: z
    .array(z.string())
    .min(1, { error: 'Добавьте хотя бы одну картинку' })
    .max(5, { error: 'Максимум 5 картинок' }),
  categoryIds: z.array(z.string()).min(1, { error: 'Выберите категорию' }),
});

export const AddProductsSchema = z.object({
  products: z.array(ProductFormSchema),
});

export type ProductFormSchema = z.infer<typeof ProductFormSchema>;
export type AddProductsSchema = z.infer<typeof AddProductsSchema>;
