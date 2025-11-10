import { type Control, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

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
  type CreateProductsSchema,
  type ProductFormSchema,
} from '../model/product-form-schema';

interface SpecificationFieldsProps {
  control: Control<CreateProductsSchema | ProductFormSchema>;
  name: 'specifications' | `products.${number}.specifications`;
}

export function SpecificationFields({
  control,
  name,
}: SpecificationFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addSpecification = () => {
    append({ name: '', value: '' });
  };

  return (
    <div className="space-y-3">
      {fields.map((field, specIndex) => (
        <div key={field.id} className="mt-4 flex gap-2">
          <div className="flex-1">
            <FormField
              control={control}
              name={`${name}.${specIndex}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название *:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Название характеристики" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={control}
              name={`${name}.${specIndex}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Значение *:</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} placeholder="Значение" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(specIndex)}
                        className="text-destructive hover:text-destructive mt-0 h-9 self-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addSpecification}
        className="flex items-center gap-2 bg-transparent"
      >
        <Plus className="h-4 w-4" />
        Добавить характеристику
      </Button>
    </div>
  );
}
