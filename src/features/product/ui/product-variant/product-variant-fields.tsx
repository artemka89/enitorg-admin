import { useState } from 'react';
import {
  type Control,
  type FieldArray,
  type FieldArrayPath,
  type FieldValues,
  type Path,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

import { formatPrice } from '@/shared/lib/format-price';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import type {
  ProductAttributeSchema,
  ProductVariantSchema,
} from '../../model/product-form-schema';

import { ProductVariantModal } from './product-variant-modal';

interface VariantFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
}

export function ProductVariantFields<TFieldValues extends FieldValues>({
  control,
  name,
}: VariantFieldsProps<TFieldValues>) {
  const { getValues } = useFormContext<TFieldValues>();

  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null,
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    keyName: 'key',
  });

  const getVariantTitle = (index: number) => {
    if (index === null) return '';

    const variant = getValues(name as Path<TFieldValues>)[index];

    return `Вариант ${index + 1}: ${formatPrice(variant.price)} - ${(
      getValues(name as Path<TFieldValues>)[index]
        .attributes as ProductAttributeSchema[]
    )
      .map((attr) => `${attr.value}${attr.measurementUnit || ''}`)
      .join(', ')}${variant.code && ` - ${variant.code}`}`;
  };

  const addNewVariant = () => {
    const lastVariant = getValues(name as Path<TFieldValues>).at(-1);

    append({
      id: '',
      code: Number.isNaN(Number(lastVariant.code))
        ? ''
        : String(Number(lastVariant.code) + 1),
      price: 0,
      imageUrls: [],
      status: lastVariant?.status || 'IN_SALE',
      minSaleQuantity: lastVariant?.minSaleQuantity || 1,
      attributes: lastVariant?.attributes || [],
      specifications: lastVariant?.specifications || [],
    } as FieldArray<TFieldValues, typeof name>);

    setEditingVariantIndex(fields.length);
  };

  const handleCloseDialog = () => {
    setEditingVariantIndex(null);
  };

  return (
    <div className="space-y-4">
      <Typography tag="p" size="2xl" weight="semibold">
        Варианты
      </Typography>
      <div className="space-y-2">
        {fields.map((field, index) => {
          const variant = field as unknown as ProductVariantSchema & {
            key: string;
          };

          return (
            <div
              key={variant.key}
              className="flex items-center justify-between gap-2"
            >
              <Button
                variant="outline"
                type="button"
                className="flex-1 justify-start truncate"
                onClick={() => setEditingVariantIndex(index)}
              >
                <Typography tag="p">{getVariantTitle(index)}</Typography>
              </Button>
              {!variant.id && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                  disabled={!!variant.id}
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
          );
        })}
        <Button type="button" size="sm" onClick={addNewVariant}>
          <Plus className="mr-2 size-4" />
          Добавить вариант
        </Button>
      </div>

      <ProductVariantModal
        name={name}
        getTitle={getVariantTitle}
        editingIndex={editingVariantIndex}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
