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
import { useCreateCategory } from '../model/use-create-category';
import { useGetCategories } from '../model/use-get-categories';

export const AddCategoryForm: FC = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading: isLoadingCategories } = useGetCategories(
    { onlyParents: true },
  );
  const { mutate: addCategory, isPending } = useCreateCategory();

  const form = useForm<AddCategorySchema>({
    defaultValues: {
      name: '',
      parentId: 'none',
      seoTitle: '',
      seoH1: '',
      seoDescription: '',
    },
    resolver: zodResolver(AddCategorySchema),
  });

  const onSubmit = (data: AddCategorySchema) => {
    const parentId = data.parentId === 'none' ? null : data.parentId;
    addCategory(
      { ...data, parentId: parentId || null },
      {
        onSuccess: () => navigate(ROUTES.categories.base),
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-6 max-w-2xl"
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
                    onValueChange={(value) =>
                      field.onChange(value === 'none' ? undefined : value)
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
