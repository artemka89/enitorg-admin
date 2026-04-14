import { type FC } from 'react';
import { type Control, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

import { MeasurementSelect } from '@/features/measurement';
import { Button } from '@/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Typography } from '@/shared/ui/typography';

import { type ProductFormSchema } from '../../model/product-form-schema';

export const VariantAttributesFields: FC<{
  variantIndex: number;
  control: Control<ProductFormSchema>;
}> = ({ control, variantIndex }) => {
  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: `variants.${variantIndex}.attributes`,
  });

  return (
    <div className="space-y-3">
      <Typography tag="p" size="xl" weight="bold">
        Атрибуты
      </Typography>
      <div className="space-y-3">
        {attributeFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-4">
            <div className="flex-1">
              <FormField
                control={control}
                name={`variants.${variantIndex}.attributes.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Значение *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите значение" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <MeasurementSelect
              basePath={`variants.${variantIndex}.attributes.${index}`}
            />
            <div className="flex pt-[22px] gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => removeAttribute(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        onClick={() =>
          appendAttribute({
            value: '',
            measurementNameId: '',
            measurementUnitId: '',
          })
        }
      >
        <Plus />
        Добавить атрибут
      </Button>
    </div>
  );
};
