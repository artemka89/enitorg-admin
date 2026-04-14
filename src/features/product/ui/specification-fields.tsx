import {
  type Control,
  type FieldArray,
  type FieldArrayPath,
  type FieldValues,
  type Path,
  useFieldArray,
} from 'react-hook-form';
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

interface SpecificationFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldArrayPath<TFieldValues>;
}

export function SpecificationFields<TFieldValues extends FieldValues>({
  control,
  name,
}: SpecificationFieldsProps<TFieldValues>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addSpecification = () => {
    append({ name: '', value: '' } as FieldArray<TFieldValues, typeof name>);
  };

  return (
    <div className="space-y-3">
      {fields.map((field, specIndex) => (
        <div key={field.id} className=" flex gap-2">
          <div className="flex-1">
            <FormField
              control={control}
              name={`${name}.${specIndex}.name` as Path<TFieldValues>}
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
              name={`${name}.${specIndex}.value` as Path<TFieldValues>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Значение *:</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} placeholder="Значение" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-[22px]">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(specIndex)}
              className="text-destructive hover:text-destructive mt-0 h-9 self-center "
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" size="sm" onClick={addSpecification}>
        <Plus className="h-4 w-4" />
        Добавить характеристику
      </Button>
    </div>
  );
}
