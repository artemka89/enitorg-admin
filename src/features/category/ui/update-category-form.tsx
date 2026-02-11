import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Spinner } from '@/shared/ui/spinner';

import { AddCategorySchema } from '../model/categories-schemas';
import { useGetCategories } from '../model/use-get-categories';
import { useGetCategory } from '../model/use-get-category';
import { useRemoveCategory } from '../model/use-remove-category';
import { useUpdateCategory } from '../model/use-update-category';

import { RemoveCategoryModal } from './remove-category-modal';

export const UpdateCategoryForm: FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();
  const { data: currentCategory } = useGetCategory(id);
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory();
  const { mutate: removeCategory, isPending: isPendingRemove } =
    useRemoveCategory();

  const form = useForm<AddCategorySchema>({
    values: {
      name: currentCategory?.name || '',
      parentId: currentCategory?.parentId || 'none',
    },
    resolver: zodResolver(AddCategorySchema),
  });

  const handleSubmit = async (data: AddCategorySchema) => {
    const parentId = data.parentId === 'none' ? null : data.parentId;
    updateCategory(
      { id, ...data, parentId: parentId || null },
      {
        onSuccess: () => navigate(ROUTES.categories.base),
      },
    );
  };

  const handleRemove = () => {
    removeCategory(id);
  };

  const withChildren = !!currentCategory?.children?.length;
  const isDeleteProtected = !!currentCategory?.totalProducts || withChildren;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-2xl relative"
      >
        {isLoadingCategories && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Spinner />
          </div>
        )}
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
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Родительская категория:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={withChildren}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите родительскую категорию (необязательно)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        Без родительской категории
                      </SelectItem>
                      {categories?.items
                        .filter((c) => c.id !== id)
                        .map((category) => (
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
