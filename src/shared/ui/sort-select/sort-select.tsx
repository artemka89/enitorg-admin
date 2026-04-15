import { type FC, useMemo } from 'react';

import { cn } from '@/shared/lib/cn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { Label } from '../label';

import { SORT_OPTIONS } from './constants';
import type { CurrentSortValue, SortParam } from './types';

interface SortSelectProps {
  value: CurrentSortValue;
  onValueChange: (param: SortParam) => void;
  className?: string;
}

export const SortSelect: FC<SortSelectProps> = ({
  value,
  onValueChange,
  className,
}) => {
  const handleSortChange = (value: CurrentSortValue) => {
    onValueChange({ value, ...SORT_OPTIONS[value] });
  };

  const options = useMemo(
    () =>
      Object.entries(SORT_OPTIONS).map(([value, { label, order }]) => ({
        value,
        label,
        order,
      })),
    [],
  );

  return (
    <div className={cn(className)}>
      <Label className="mb-2">Сортировать:</Label>
      <Select value={value} onValueChange={handleSortChange}>
        <SelectTrigger className="min-w-[180px] cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
