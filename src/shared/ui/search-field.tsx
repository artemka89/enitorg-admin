import { type ChangeEvent, type FC, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface SearchFieldProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
  onCancel?: () => void;
  className?: string;
}

export const SearchField: FC<SearchFieldProps> = ({
  defaultValue,
  onSearch,
  onCancel,
  className,
}) => {
  const [value, setValue] = useState(defaultValue || '');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClearSearchValue = () => {
    setValue('');
    onCancel?.();
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    if (!value) return;
    onSearch(value);
  };

  const handleEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!value) return;
    onSearch(value);
  };

  return (
    <div
      className={cn(
        className,
        'relative flex w-full max-w-[600px] min-w-[180px] items-center',
      )}
    >
      <Input
        ref={inputRef}
        type="text"
        name="search"
        value={value}
        onChange={handleChangeSearchValue}
        onKeyDown={handleEnterClick}
        placeholder="Поиск"
        className="border-primary bg-background focus-visible:ring-ring/50 focus-visible:border-primary  grow-1 rounded-r-none border-2 border-r-0 pr-8 outline-0 focus-visible:ring-0"
      />
      <Button
        variant="link"
        size="icon"
        onClick={handleClearSearchValue}
        className={cn('absolute right-12 text-foreground hover:scale-110', {
          ['invisible']: !value,
        })}
      >
        <X className="size-6" />
      </Button>
      <Button
        size="icon"
        onClick={handleSearchClick}
        className={cn('w-12 rounded-l-none')}
      >
        <Search className="size-6" />
      </Button>
    </div>
  );
};
