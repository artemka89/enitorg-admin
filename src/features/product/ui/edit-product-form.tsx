import { type FC } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

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
import { Spinner } from '@/shared/ui/spinner';
import { Typography } from '@/shared/ui/typography';

import { ProductFormSchema } from '../model/product-form-schema';
import { useEditProduct } from '../model/use-edit-product';
import { useGetProduct } from '../model/use-get-product';

import { VariantFields } from './product-variant/product-variant-fields';
import { RichTextEditor } from './rich-text-editor/rich-text-editor';
import { ProductStatusSelect } from './product-status-select';
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
    if (!product || !product?.id) return;

    update(
      { id: product.id, ...data },
      {
        onSuccess: () => {
          form.reset();
          navigate(ROUTES.products.base);
        },
      },
    );
  };

  const onError = (errors: FieldErrors<ProductFormSchema>) => {
    if (Array.isArray(errors.variants)) {
      const errorIndex = errors.variants.findIndex((err) => err);
      if (errorIndex !== -1) {
        toast.error(
          `Проверьте правильность заполнения полей в варианте №${
            errorIndex + 1
          }`,
        );
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn(className, 'space-y-6 relative')}
      >
        {isLoadingProduct && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите название товара" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Статус</FormLabel>
                  <FormControl>
                    <ProductStatusSelect
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-medium">
                Категории *
              </FormLabel>
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
        <VariantFields />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-medium">Описание</FormLabel>
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
          <Typography size="2xl" weight="medium">
            Характеристики
          </Typography>
          <SpecificationFields control={form.control} name="specifications" />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Сбросить
          </Button>
          <Button
            type="submit"
            disabled={isLoadingProduct || !form.formState.isDirty}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};
