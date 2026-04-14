import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import type { ProductStatus } from '../model/types';

interface ProductStatusSelectProps {
  value: ProductStatus;
  onChange: (value: ProductStatus) => void;
}

export const ProductStatusSelect: React.FC<ProductStatusSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="min-w-[130px]">
        <SelectValue placeholder="Выберите статус" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="IN_SALE">В продаже</SelectItem>
        <SelectItem value="ARCHIVED">В архиве</SelectItem>
        <SelectItem value="DRAFT">Черновик</SelectItem>
      </SelectContent>
    </Select>
  );
};
