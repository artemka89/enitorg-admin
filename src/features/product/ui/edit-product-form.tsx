import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { CategoriesModal } from '@/features/category/ui/toggle-category/categories-modal';
import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Spinner } from '@/shared/ui/spinner';
import { Typography } from '@/shared/ui/typography';

import { ProductFormSchema } from '../model/product-form-schema';
import { useEditProduct } from '../model/use-edit-product';
import { useGetProduct } from '../model/use-get-product';

import { RichTextEditor } from './rich-text-editor/rich-text-editor';
import { VariantFields } from './product-variant-fields';
import { SpecificationFields } from './specification-fields';

interface EditProductFormProps {
  id?: string;
  className?: string;
}

export const EditProductForm: FC<EditProductFormProps> = ({
  id,
  className,
}) => {
  const { data: product, isLoading: isLoadingProduct } = useGetProduct(id);
  const { mutate: update } = useEditProduct();

  const navigate = useNavigate();

  const form = useForm<ProductFormSchema>({
    values: {
      name: product?.name || '',
      status: product?.status || 'IN_SALE',
      description: product?.description || '',
      specifications: product?.specifications || [],
      categoryIds: product?.categories.map((category) => category.id) || [],
      variants: product?.variants || [],
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const onSubmit = async (data: ProductFormSchema) => {
    if (!id) return;

    update(
      { id, ...data },
      {
        onSuccess: () => {
          form.reset();
          navigate(ROUTES.products.base);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, 'space-y-6 relative')}
      >
        {isLoadingProduct && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <Typography tag="h1" size="3xl" weight="bold">
          {product?.name}
        </Typography>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название *:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Введите название товара" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категории *:</FormLabel>
              <FormControl>
                <CategoriesModal
                  selectedCategories={field.value}
                  onSelectionChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <VariantFields
          // TODO: fix types
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          control={form.control}
          name="variants"
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание:</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Введите описание товара..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Label>Характеристики</Label>
          <SpecificationFields control={form.control} name="specifications" />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Сбросить
          </Button>
          <Button type="submit" disabled={false}>
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};
