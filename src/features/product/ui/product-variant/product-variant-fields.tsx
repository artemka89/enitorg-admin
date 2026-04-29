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
import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { formatPrice } from '@/shared/lib/format-price';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';

import type {
  ProductAttributeSchema,
  ProductVariantSchema,
} from '../../model/product-form-schema';

import { ProductVariantModal } from './product-variant-modal';
import { SortableProductVariantItem } from './sortable-product-variant-item';

interface VariantFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
  actions?: React.ReactNode;
}

export function ProductVariantFields<TFieldValues extends FieldValues>({
  control,
  name,
  actions,
}: VariantFieldsProps<TFieldValues>) {
  const { getValues } = useFormContext<TFieldValues>();

  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(
    null,
  );

  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
    keyName: 'key',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.key === active.id);
      const newIndex = fields.findIndex((field) => field.key === over.id);

      move(oldIndex, newIndex);
    }
  };

  const getVariantTitle = (index: number) => {
    if (index === null || !getValues(name as Path<TFieldValues>)?.[index])
      return '';

    const variant = getValues(name as Path<TFieldValues>)[index];

    const attributeNames =
      variant.attributes.length > 0
        ? ` - ${(variant.attributes as ProductAttributeSchema[])
            .map((attr) => `${attr.value}${attr.measurementUnit || ''}`)
            .join(', ')}`
        : '';

    return `Вариант ${index + 1}: ${formatPrice(variant.price)}${attributeNames}${variant.code && ` - ${variant.code}`}`;
  };

  const addNewVariant = () => {
    const lastVariant = getValues(name as Path<TFieldValues>).at(-1);

    append({
      id: '',
      code: lastVariant?.code ? String(Number(lastVariant.code) + 1) : '',
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.key)}
          strategy={rectSortingStrategy}
        >
          <div className="space-y-2">
            {actions}
            {fields.map((field, index) => (
              <SortableProductVariantItem
                key={field.key}
                field={
                  field as unknown as ProductVariantSchema & {
                    key: string;
                  }
                }
                index={index}
                getVariantTitle={getVariantTitle}
                setEditingVariantIndex={setEditingVariantIndex}
                remove={remove}
              />
            ))}
            <Button type="button" size="sm" onClick={addNewVariant}>
              <Plus className="mr-2 size-4" />
              Добавить вариант
            </Button>
          </div>
        </SortableContext>
      </DndContext>

      <ProductVariantModal
        name={name}
        getTitle={getVariantTitle}
        editingIndex={editingVariantIndex}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
