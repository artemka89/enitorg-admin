import { type FC } from 'react';
import { type Control, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { SortableImagePreviews } from '@/shared/ui/sortable-image-previews';
import { Typography } from '@/shared/ui/typography';

import { type ProductFormSchema } from '../model/product-form-schema';

import { ImageUploadField } from './image-upload-field';
import { VariantAttributesFields } from './product-attribute-field';
import { SpecificationFields } from './specification-fields';

export const VariantFields: FC<{
  control: Control<ProductFormSchema>;
  name: 'variants';
}> = ({ control, name }) => {
  const variants = useWatch({
    control,
    name,
  });

  const { fields, append } = useFieldArray({
    control,
    name,
  });

  const getAttributeTitle = (
    attributes: ProductFormSchema['variants'][0]['attributes'] | undefined,
  ) => {
    if (!attributes || attributes.length === 0) {
      return null;
    }
    const title = attributes
      .map((attr) => `${attr.value || ''}${attr.measurementUnit || ''}`.trim())
      .filter((str) => str.length > 0)
      .join(', ');
    return title ? title : null;
  };

  const getImageName = (index: number) => {
    return `${variants?.[index].code}-${variants?.[index]?.imageUrls?.length + 1}`;
  };

  return (
    <div className="space-y-4">
      <Typography tag="p" size="2xl" weight="bold">
        Варианты
      </Typography>
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 rounded-md border border-primary/50 p-4"
          >
            <div className="flex items-center justify-between">
              <Typography tag="h3" size="xl" weight="bold">
                Вариант {index + 1}:{' '}
                {getAttributeTitle(variants?.[index]?.attributes)} -{' '}
                {field.code}
              </Typography>
              <FormField
                control={control}
                name={`variants.${index}.status`}
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormLabel>Статус:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-[130px]">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="IN_SALE">В продаже</SelectItem>
                        <SelectItem value="ARCHIVED">В архиве</SelectItem>
                        <SelectItem value="DRAFT">Черновик</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`variants.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`variants.${index}.minSaleQuantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мин. кол-во для продажи</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
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
            <SelectSeparator className="bg-primary/60 my-6" />
            <FormField
              control={control}
              name={`variants.${index}.imageUrls`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображения *:</FormLabel>
                  <FormControl>
                    <div>
                      <ImageUploadField
                        imageUrls={field.value}
                        onImagesChange={field.onChange}
                        fileName={getImageName(index)}
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
            <VariantAttributesFields variantIndex={index} control={control} />
            <SelectSeparator className="bg-primary/60 my-6" />
            <div className="flex flex-col gap-2">
              <Typography size="xl" weight="bold">
                Характеристики
              </Typography>
              <SpecificationFields
                control={control}
                name={`variants.${index}.specifications`}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        onClick={() =>
          append({
            id: '',
            code: '',
            price: 0,
            status: 'DRAFT',
            attributes: [],
            imageUrls: [],
            minSaleQuantity: 1,
            specifications: [],
          })
        }
      >
        <Plus />
        Добавить вариант
      </Button>
    </div>
  );
};
