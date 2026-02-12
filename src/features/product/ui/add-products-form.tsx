import { type FC, useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';

import { CategoriesModal } from '@/features/category/ui/toggle-category/categories-modal';
import { useDebouncedCallback } from '@/shared/hooks/use-debounced-callback';
import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
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

import { AddProductsSchema } from '../model/product-form-schema';
import { useAddProducts } from '../model/use-add-products';

import { RichTextEditor } from './rich-text-editor/rich-text-editor';
import { ImageUploadField } from './image-upload-field';
import { SpecificationFields } from './specification-fields';

const LOCAL_STORAGE_KEY = 'add-products-form';

const defaultProductValue = {
  name: '',
  code: '',
  price: 0,
  weight: 0,
  packageQuantity: 1,
  description: '',
  specifications: [],
  imageUrls: [],
  categoryIds: [],
};

interface AddProductsFormProps {
  className?: string;
}

export const AddProductsForm: FC<AddProductsFormProps> = ({ className }) => {
  const { mutate, isPending } = useAddProducts();

  const navigate = useNavigate();

  const form = useForm<AddProductsSchema>({
    defaultValues: {
      products: [defaultProductValue],
    },
    resolver: zodResolver(AddProductsSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  const onSubmit = async (data: AddProductsSchema) => {
    mutate(data.products, {
      onSuccess: () => {
        canSaveToLocalStorage.current = false;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate(ROUTES.products.base);
      },
    });
  };

  const addProduct = () => {
    append(defaultProductValue);
  };

  const canSaveToLocalStorage = useRef(true);

  const debouncedSave = useDebouncedCallback((value) => {
    if (canSaveToLocalStorage.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
  }, 500);

  const getImageName = (index: number) => {
    return `${form.watch(`products.${index}.code`)}-${form.watch(`products.${index}.imageUrls`).length + 1}`;
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
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, 'space-y-6')}
      >
        {fields.map((field, index) => (
          <Card key={field.id} className="relative p-4">
            <CardHeader className="mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Товар {index + 1}</CardTitle>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              {fields.length === 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    form.reset({ products: [defaultProductValue] });
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  Очистить
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name={`products.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя *:</FormLabel>
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
                    name={`products.${index}.code`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Код товара *:</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Введите код товара" />
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
                    name={`products.${index}.price`}
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
                              field.onChange(
                                Number.parseFloat(e.target.value) || 0,
                              )
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
                    name={`products.${index}.weight`}
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
                              field.onChange(
                                Number.parseFloat(e.target.value) || 0,
                              )
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
                    name={`products.${index}.packageQuantity`}
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
                              field.onChange(
                                Number.parseInt(e.target.value) || 1,
                              )
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
                name={`products.${index}.categoryIds`}
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
                name={`products.${index}.imageUrls`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Изображения *:</FormLabel>
                    <FormControl>
                      <div>
                        <ImageUploadField
                          imageUrls={field.value}
                          onImagesChange={field.onChange}
                          fileName={getImageName(index)}
                          disabled={!form.watch(`products.${index}.code`)}
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
                name={`products.${index}.description`}
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
                  name={`products.${index}.specifications`}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={addProduct}
            className="flex items-center gap-2 bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Добавить еще товар
          </Button>

          <Button type="submit" disabled={isPending}>
            Сохранить товары ({fields.length})
          </Button>
        </div>
      </form>
    </Form>
  );
};
