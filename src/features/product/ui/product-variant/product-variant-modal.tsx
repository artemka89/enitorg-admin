import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

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

import { type ProductFormSchema } from '../../model/product-form-schema';
import { ImageUploadField } from '../image-upload-field';
import { ProductCodeInput } from '../product-code-input';
import { ProductStatusSelect } from '../product-status-select';
import { SpecificationFields } from '../specification-fields';

import { VariantAttributesFields } from './product-attribute-field';

interface ProductVariantModalProps {
  editingIndex: number | null;
  onClose: () => void;
}

export const ProductVariantModal: FC<ProductVariantModalProps> = ({
  editingIndex,
  onClose,
}) => {
  const { control, getValues, trigger, watch, resetField } =
    useFormContext<ProductFormSchema>();

  const getTitle = (index: number) => {
    if (index === null) return '';

    const code = getValues('variants')[index].code;

    return `${getValues('variants')
      [index].attributes.map(
        (attr) => `${attr.value}${attr.measurementUnit || ''}`,
      )
      .join(', ')}${code && ` - ${code}`}`;
  };

  const getImageName = (index: number) => {
    const variants = getValues('variants');
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
      `variants.${editingIndex}.code`,
      `variants.${editingIndex}.price`,
      `variants.${editingIndex}.imageUrls`,
      `variants.${editingIndex}.specifications`,
      `variants.${editingIndex}.attributes`,
    ]);

    if (!isValid) return;

    onClose();
  };

  const handleReset = () => {
    if (editingIndex === null) return;

    resetField(`variants.${editingIndex}.code`);
    resetField(`variants.${editingIndex}.price`);
    resetField(`variants.${editingIndex}.attributes`);
    resetField(`variants.${editingIndex}.specifications`);
    resetField(`variants.${editingIndex}.imageUrls`);
    resetField(`variants.${editingIndex}.status`);
    resetField(`variants.${editingIndex}.minSaleQuantity`);
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
                    name={`variants.${editingIndex}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Цена *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(
                                Number.parseFloat(e.target.value) || 1,
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
                    control={control}
                    name={`variants.${editingIndex}.code`}
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
                    name={`variants.${editingIndex}.minSaleQuantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Мин. кол-во для продажи *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
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
                <div>
                  <FormField
                    control={control}
                    name={`variants.${editingIndex}.status`}
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
                name={`variants.${editingIndex}.imageUrls`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Изображения *</FormLabel>
                    <FormControl>
                      <div>
                        <ImageUploadField
                          imageUrls={field.value}
                          onImagesChange={field.onChange}
                          fileName={getImageName(editingIndex)}
                          disabled={!watch(`variants.${editingIndex}.code`)}
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
              <VariantAttributesFields
                variantIndex={editingIndex}
                control={control}
              />
              <SelectSeparator className="bg-primary/60 my-6" />
              <div className="flex flex-col gap-2">
                <Typography size="xl" weight="bold">
                  Характеристики
                </Typography>
                <SpecificationFields
                  control={control}
                  name={`variants.${editingIndex}.specifications`}
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
};
