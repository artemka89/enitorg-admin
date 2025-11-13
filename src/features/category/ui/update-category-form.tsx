import { type FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { cyrillicToTranslit } from '@/shared/lib/cyrillic-to-translit';
import { API_ROUTES } from '@/shared/routes';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { AddCategorySchema } from '../model/categories-schemas';
import { useGetCategories } from '../model/use-get-categories';
import { useGetCategory } from '../model/use-get-category';
import { useRemoveCategory } from '../model/use-remove-category';
import { useUpdateCategory } from '../model/use-update-category';

import { RemoveCategoryModal } from './remove-category-modal';

export const UpdateCategoryForm: FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  const { data: categories } = useGetCategories();
  const { data: currentCategory } = useGetCategory(id);
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory();
  const { mutate: removeCategory, isPending: isPendingRemove } =
    useRemoveCategory();

  const form = useForm<AddCategorySchema>({
    values: {
      name: currentCategory?.name || '',
      slug: currentCategory?.slug || '',
      order: currentCategory?.order || 0,
      parentId: currentCategory?.parentId || 'none',
    },
    resolver: zodResolver(AddCategorySchema),
  });

  const watchName = form.watch('name');

  useEffect(() => {
    if (watchName) {
      const slug = cyrillicToTranslit(watchName);
      form.setValue('slug', slug);
    }
  }, [watchName, form]);

  const handleSubmit = async (data: AddCategorySchema) => {
    updateCategory(
      { id, ...data },
      {
        onSuccess: () => navigate(API_ROUTES.categories.base),
      },
    );
  };

  const handleRemove = () => {
    removeCategory(id);
  };

  const isDeleteProtected =
    !!currentCategory?.parentId || !!currentCategory?.totalProducts;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название категории *:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Введите название категории" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL-адрес (slug) *:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="url-адрес-категории" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-muted-foreground text-sm">
            Автоматически генерируется из названия. Можно редактировать.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-2/3">
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Родительская категория:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === 'none' ? null : value)
                      }
                      value={field.value}
                      disabled={!!currentCategory?.children.length}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите родительскую категорию (необязательно)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          Без родительской категории
                        </SelectItem>
                        {categories?.items.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1/3">
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Порядковый номер *:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="url-адрес-категории"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={
              isPendingUpdate || isPendingRemove || !form.formState.isDirty
            }
            className="flex-1"
          >
            Сохранить
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={
              isPendingUpdate || isPendingRemove || !form.formState.isDirty
            }
            onClick={() => form.reset()}
          >
            Очистить
          </Button>
          <RemoveCategoryModal
            isProtected={isDeleteProtected}
            categoryName={currentCategory?.name || ''}
            onRemove={handleRemove}
          />
        </div>
      </form>
    </Form>
  );
};
