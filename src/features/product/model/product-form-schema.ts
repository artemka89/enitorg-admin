import z from 'zod';

const ProductStatusSchema = z.enum(['IN_SALE', 'ARCHIVED', 'DRAFT']);

const ProductImageUrlsSchema = z
  .array(z.string())
  .min(1, { error: 'Добавьте хотя бы одну картинку' })
  .max(5, { error: 'Максимум 5 картинок' });

const ProductSpecificationSchema = z.object({
  name: z
    .string()
    .min(1, { error: 'Название характеристики не может быть пустым' }),
  value: z
    .string()
    .min(1, { error: 'Значение характеристики не может быть пустым' }),
});

const ProductAttributeSchema = z.object({
  value: z.string().min(1, { error: 'Значение не может быть пустым' }),
  measurementNameId: z.string({ error: 'Выберите едини измерения' }),
  measurementUnitId: z.string({ error: 'Выберите едини измерения' }).optional(),
  measurementUnit: z.string().optional(),
});

const ProductVariantSchema = z.object({
  id: z.string().optional(),
  code: z.string({ error: 'Введите код варианта' }),
  status: ProductStatusSchema,
  price: z.number().positive({ error: 'Цена должна быть больше 0' }),
  imageUrls: ProductImageUrlsSchema,
  minSaleQuantity: z
    .number()
    .min(1, { error: 'Минимальное количество должно быть больше 0' }),
  attributes: z.array(ProductAttributeSchema),
  specifications: z.array(ProductSpecificationSchema),
});

export const ProductFormSchema = z.object({
  name: z.string().min(2, { error: 'Имя должно быть не менее 2 символов' }),
  status: ProductStatusSchema,
  description: z.string(),
  specifications: z.array(ProductSpecificationSchema),
  variants: z.array(ProductVariantSchema),
  categoryIds: z.array(z.string()).min(1, { error: 'Выберите категорию' }),
});

export const AddProductsSchema = z.object({
  products: z.array(ProductFormSchema),
});

export type ProductFormSchema = z.infer<typeof ProductFormSchema>;
export type AddProductsSchema = z.infer<typeof AddProductsSchema>;
