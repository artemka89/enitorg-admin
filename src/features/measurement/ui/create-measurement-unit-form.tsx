import { type FC, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export const CreateMeasurementUnitForm: FC<{
  className?: string;
  isLoading?: boolean;
  onSubmit: (name: string) => void;
}> = ({ className, isLoading, onSubmit }) => {
  const [isEdited, setIsEdited] = useState(false);

  const measurementUnitNameInputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setIsEdited(false);
      return;
    }
    setIsEdited(true);
    return event.target.value;
  };

  const handleSubmit = () => {
    const name = measurementUnitNameInputRef.current?.value.trim();
    if (!name) return;
    onSubmit(name);
    if (measurementUnitNameInputRef.current?.value) {
      measurementUnitNameInputRef.current.value = '';
    }

    setIsEdited(false);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <Input
        ref={measurementUnitNameInputRef}
        placeholder="Создать новую единицу измерения"
        className="flex-1"
        onChange={handleOnChangeName}
      />

      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={!isEdited || isLoading}
      >
        <Plus />
      </Button>
    </div>
  );
};
