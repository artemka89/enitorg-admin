import { type FC, useEffect, useRef } from 'react';
import { type FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { CategoriesModal } from '@/features/category/ui/toggle-category/categories-modal';
import { useDebouncedCallback } from '@/shared/hooks/use-debounced-callback';
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
import { Typography } from '@/shared/ui/typography';

import { AddProductsSchema } from '../model/product-form-schema';
import { useAddProducts } from '../model/use-add-products';

import { ProductVariantFields } from './product-variant/product-variant-fields';
import { RichTextEditor } from './rich-text-editor/rich-text-editor';
import { ProductStatusSelect } from './product-status-select';
import { SpecificationFields } from './specification-fields';

const LOCAL_STORAGE_KEY = 'add-products-form';

const defaultProductValue: AddProductsSchema['items'][0] = {
  name: '',
  status: 'IN_SALE',
  description: '',
  specifications: [],
  variants: [],
  categoryIds: [],
};

interface AddProductsFormProps {
  className?: string;
}

export const AddProductsForm: FC<AddProductsFormProps> = () => {
  const { mutate, isPending } = useAddProducts();

  const navigate = useNavigate();

  const form = useForm<AddProductsSchema>({
    defaultValues: {
      items: [defaultProductValue],
    },
    resolver: zodResolver(AddProductsSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const handleOnSubmit = async (data: AddProductsSchema) => {
    mutate(data.items, {
      onSuccess: () => {
        canSaveToLocalStorage.current = false;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate(ROUTES.products.base);
      },
    });
  };

  const handleAddProduct = () => {
    append(defaultProductValue);
  };

  const handleAddProductCopy = () => {
    const lastProduct = form.getValues('items').at(-1);
    if (!lastProduct) return;

    append({
      ...lastProduct,
    });
  };

  const canSaveToLocalStorage = useRef(true);

  const debouncedSave = useDebouncedCallback((value) => {
    if (canSaveToLocalStorage.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
  }, 500);

  const onError = (errors: FieldErrors<AddProductsSchema>) => {
    if (Array.isArray(errors.items)) {
      errors.items.forEach((item, productIndex) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorIndex = item.variants.findIndex((err: any) => err);
        if (errorIndex !== -1) {
          toast.error(
            `Проверьте правильность заполнения полей в товаре ${productIndex + 1} в варианте/х №${
              errorIndex + 1
            }`,
          );
        }
      });
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData) {
          form.reset(parsedData);
        }
      } catch (error) {
        console.error(
          'Failed to parse products from localStorage on mount',
          error,
        );
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      debouncedSave(value);
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSave]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit, onError)}
        className="space-y-6 relative"
      >
        {fields.map((_, index) => (
          <div
            key={index}
            className="border-b-2 border-dashed border-primary pb-6 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center mb-4">
              <Typography size="3xl" weight="semibold">
                Товар {index + 1}
              </Typography>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive"
                >
                  Удалить <Trash2 className="h-4 w-4" />
                </Button>
              )}
              {fields.length === 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    form.reset({ items: [defaultProductValue] });
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  Очистить
                </Button>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Введите название товара"
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
                  name={`items.${index}.status`}
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
              name={`items.${index}.categoryIds`}
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

            <ProductVariantFields
              control={form.control}
              name={`items.${index}.variants`}
            />

            <div className="flex flex-col gap-2">
              <Typography size="2xl" weight="medium">
                Характеристики
              </Typography>
              <SpecificationFields
                control={form.control}
                name={`items.${index}.specifications`}
              />
            </div>

            <FormField
              control={form.control}
              name={`items.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-medium">
                    Описание
                  </FormLabel>
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
          </div>
        ))}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Добавить еще товар
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddProductCopy}
            disabled={!form.getValues('items').at(-1)}
            className="flex items-center gap-2 bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Добавить копию товара
          </Button>
          <Button type="submit" disabled={isPending} className="ml-auto">
            Сохранить товары ({fields.length})
          </Button>
        </div>
      </form>
    </Form>
  );
};
