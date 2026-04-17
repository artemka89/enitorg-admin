import {
  type ArrayPath,
  type FieldArrayPath,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { SelectSeparator } from '@/shared/ui/select';
import { SortableImagePreviews } from '@/shared/ui/sortable-image-previews';
import { Typography } from '@/shared/ui/typography';

import { ImageUploadField } from '../image-upload-field';
import { ProductCodeInput } from '../product-code-input';
import { ProductStatusSelect } from '../product-status-select';
import { SpecificationFields } from '../specification-fields';

import { AttributesFields } from './product-attribute-field';

interface ProductVariantModalProps<TFieldValues extends FieldValues> {
  name: FieldArrayPath<TFieldValues>;
  editingIndex: number | null;
  getTitle: (index: number) => string;
  onClose: () => void;
}

export function ProductVariantModal<TFieldValues extends FieldValues>({
  name,
  editingIndex,
  getTitle,
  onClose,
}: ProductVariantModalProps<TFieldValues>) {
  const { control, getValues, trigger, watch, resetField } =
    useFormContext<TFieldValues>();

  const getImageName = (index: number) => {
    const variants = getValues(name as Path<TFieldValues>);
    return `${variants?.[index].code}-${
      variants?.[index]?.imageUrls?.length + 1
    }`;
  };

  const handleSave = async () => {
    if (editingIndex === null) {
      onClose();
      return;
    }

    const isValid = await trigger([
      `${name}.${editingIndex}.code` as Path<TFieldValues>,
      `${name}.${editingIndex}.price` as Path<TFieldValues>,
      `${name}.${editingIndex}.imageUrls` as Path<TFieldValues>,
      `${name}.${editingIndex}.specifications` as Path<TFieldValues>,
      `${name}.${editingIndex}.attributes` as Path<TFieldValues>,
    ]);

    if (!isValid) return;

    onClose();
  };

  const handleReset = () => {
    if (editingIndex === null) return;

    resetField(`${name}.${editingIndex}.code` as Path<TFieldValues>);
    resetField(`${name}.${editingIndex}.price` as Path<TFieldValues>);
    resetField(`${name}.${editingIndex}.attributes` as Path<TFieldValues>);
    resetField(`${name}.${editingIndex}.specifications` as Path<TFieldValues>);
    resetField(`${name}.${editingIndex}.imageUrls` as Path<TFieldValues>);
    resetField(`${name}.${editingIndex}.status` as Path<TFieldValues>);
    resetField(`${name}.${editingIndex}.minSaleQuantity` as Path<TFieldValues>);
  };

  return (
    <Dialog open={editingIndex !== null} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1200px] md:max-w-3xl lg:max-w-5xl">
        <DialogDescription aria-describedby={undefined} />
        {editingIndex !== null && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Редактирование: {getTitle(editingIndex || 0)}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex max-h-[70vh] flex-col gap-4 p-1 pr-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <FormField
                    control={control}
                    name={`${name}.${editingIndex}.price` as Path<TFieldValues>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Цена *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number.parseFloat(e.target.value))
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
                    control={control}
                    name={`${name}.${editingIndex}.code` as Path<TFieldValues>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Код товара *</FormLabel>
                        <FormControl>
                          <ProductCodeInput
                            index={editingIndex}
                            {...field}
                            // TODO: временно разрешаем изменять код
                            // disabled={!!getValues('variants')[editingIndex].id}
                            placeholder="Введите код товара"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="max-w-[190px]">
                  <FormField
                    control={control}
                    name={
                      `${name}.${editingIndex}.minSaleQuantity` as Path<TFieldValues>
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Мин. кол-во для продажи *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number.parseInt(e.target.value))
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
                    control={control}
                    name={
                      `${name}.${editingIndex}.status` as Path<TFieldValues>
                    }
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
              <SelectSeparator className="bg-primary/60 my-6" />
              <FormField
                control={control}
                name={`${name}.${editingIndex}.imageUrls` as Path<TFieldValues>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Изображения *</FormLabel>
                    <FormControl>
                      <div>
                        <ImageUploadField
                          imageUrls={field.value}
                          onImagesChange={field.onChange}
                          fileName={getImageName(editingIndex)}
                          disabled={
                            !watch(
                              `${name}.${editingIndex}.code` as Path<TFieldValues>,
                            )
                          }
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
              <SelectSeparator className="bg-primary/60 my-6" />
              <AttributesFields
                name={
                  `${name}.${editingIndex}.attributes` as ArrayPath<TFieldValues>
                }
                control={control}
              />
              <SelectSeparator className="bg-primary/60 my-6" />
              <div className="flex flex-col gap-2">
                <Typography size="xl" weight="bold">
                  Характеристики
                </Typography>
                <SpecificationFields
                  control={control}
                  name={
                    `${name}.${editingIndex}.specifications` as ArrayPath<TFieldValues>
                  }
                />
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleReset}>
                Сбросить
              </Button>
              <Button type="button" onClick={handleSave}>
                Сохранить и закрыть
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
