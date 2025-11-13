import { type FC, useEffect, useMemo } from 'react';
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
import { useCreateCategory } from '../model/use-create-category';
import { useGetCategories } from '../model/use-get-categories';

export const AddCategoryForm: FC = () => {
  const navigate = useNavigate();

  const { data: categories } = useGetCategories({ withChildren: true });
  const { mutate: addCategory, isPending } = useCreateCategory();

  const getMaxOrder = useMemo(() => {
    return Math.max(...(categories?.items.map((item) => item.order) || [0]));
  }, [categories?.items]);

  const form = useForm<AddCategorySchema>({
    defaultValues: {
      name: '',
      slug: '',
      order: getMaxOrder,
      parentId: 'none',
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

  const onSubmit = async (data: AddCategorySchema) => {
    const parentId = data.parentId === 'none' ? undefined : data.parentId;
    addCategory(
      { ...data, parentId },
      {
        onSuccess: () => navigate(API_ROUTES.categories.base),
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            disabled={isPending || !form.formState.isDirty}
            className="flex-1"
          >
            Создать категорию
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isPending || !form.formState.isDirty}
            onClick={() => form.reset()}
          >
            Очистить
          </Button>
        </div>
      </form>
    </Form>
  );
};
