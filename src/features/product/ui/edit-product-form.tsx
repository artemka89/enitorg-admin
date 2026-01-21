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
import { SortableImagePreviews } from '@/shared/ui/sortable-image-previews';
import { Spinner } from '@/shared/ui/spinner';
import { Typography } from '@/shared/ui/typography';

import { ProductFormSchema } from '../model/product-form-schema';
import { useEditProduct } from '../model/use-edit-product';
import { useGetProduct } from '../model/use-get-product';

import { RichTextEditor } from './rich-text-editor/rich-text-editor';
import { ImageUploadField } from './image-upload-field';
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
      code: product?.code || '',
      price: product?.price || 0,
      weight: product?.weight || 0,
      packageQuantity: product?.packageQuantity || 0,
      description: product?.description || '',
      specifications: product?.specifications || [],
      imageUrls: product?.imageUrls || [],
      categoryIds: product?.categories.map((category) => category.id) || [],
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

  const getImageName = () => {
    return `${form.watch('code')}-${form.watch('imageUrls').length + 1}`;
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя *:</FormLabel>
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Код товара *:</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      placeholder="Введите код товара"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена *:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вес, гр. *:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="packageQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество в упаковке *:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      placeholder="1"
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 1)
                      }
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
        <FormField
          control={form.control}
          name="imageUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Изображения *:</FormLabel>
              <FormControl>
                <div>
                  <ImageUploadField
                    imageUrls={field.value}
                    onImagesChange={field.onChange}
                    fileName={getImageName()}
                  />
                  <SortableImagePreviews
                    imageUrls={field.value}
                    onImagesChange={field.onChange}
                    className="mt-2"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
        <div className="space-y-2">
          <Label>Характеристики</Label>
          <SpecificationFields
            // TODO: fix types
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            control={form.control}
            name="specifications"
          />
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
