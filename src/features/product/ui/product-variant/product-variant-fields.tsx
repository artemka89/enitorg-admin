import { type FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import { type ProductFormSchema } from '../../model/product-form-schema';

import { ProductVariantModal } from './product-variant-modal';

export const VariantFields: FC = () => {
  const formName = 'variants';

  const { control, getValues } = useFormContext<ProductFormSchema>();

  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null,
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: formName,
    keyName: 'key',
  });

  const currentVariant = editingVariantIndex
    ? getValues(formName)[editingVariantIndex]
    : null;

  const getVariantTitle = (index: number) => {
    if (index === null) return '';

    const code = getValues(formName)[index].code;

    return `${getValues(formName)
      [index].attributes.map(
        (attr) => `${attr.value}${attr.measurementUnit || ''}`,
      )
      .join(', ')}${code && ` - ${code}`}`;
  };

  const addNewVariant = () => {
    const lastVariant = getValues(formName).at(-1);

    append({
      id: '',
      code: '',
      price: 0,
      imageUrls: [],
      status: lastVariant?.status || 'IN_SALE',
      minSaleQuantity: lastVariant?.minSaleQuantity || 1,
      attributes: lastVariant?.attributes || [],
      specifications: lastVariant?.specifications || [],
    });

    setEditingVariantIndex(fields.length);
  };

  const handleCloseDialog = () => {
    if (editingVariantIndex !== null) {
      const attributesCount = currentVariant?.attributes?.length;

      if (attributesCount === 0) {
        remove(editingVariantIndex);
      }
    }

    setEditingVariantIndex(null);
  };

  return (
    <div className="space-y-4">
      <Typography tag="p" size="2xl" weight="semibold">
        Варианты
      </Typography>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.key}
            className="flex items-center justify-between gap-2"
          >
            <Button
              variant="outline"
              type="button"
              className="flex-1 justify-start truncate"
              onClick={() => setEditingVariantIndex(index)}
            >
              <Typography tag="p">
                Вариант {index + 1}: {getVariantTitle(index)}
              </Typography>
            </Button>
            {!field.id && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="text-destructive"
                disabled={!!field.id}
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" size="sm" onClick={addNewVariant}>
          <Plus className="mr-2 size-4" />
          Добавить вариант
        </Button>
      </div>

      <ProductVariantModal
        editingIndex={editingVariantIndex}
        onClose={handleCloseDialog}
      />
    </div>
  );
};
