'use client';

import { type FC, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Check, ChevronsUpDown, MoveRight } from 'lucide-react';
import { toast } from 'sonner';

import { useGetProducts } from '@/features/product/model/use-get-products';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { cn } from '@/shared/lib/cn';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import { useMoveProductVariant } from '../../model/use-move-product-variant';

export type ComboBoxItem = {
  value: string;
  label: string;
};

interface ProductMoveVariantProps {
  productId?: string;
  className?: string;
}

export const ProductMoveVariant: FC<ProductMoveVariantProps> = ({
  productId,
  className,
}) => {
  const [searchValue, debouncedValue, setSearchValue] = useDebounce('');
  const [selectedItem, setSelectedItem] = useState<ComboBoxItem | null>(null);
  const [open, setOpenState] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);

  const {
    data,
    isLoading: isLoadingData,
    hasNextPage,
    fetchNextPage,
  } = useGetProducts({
    query: debouncedValue.trim(),
  });
  const { mutate: move, isPending: isLoadingMove } = useMoveProductVariant();

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => inView && hasNextPage && fetchNextPage(),
  });

  const products = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.items.map((item) => ({ value: item.id, label: item.name })),
      ) || [],
    [data],
  );

  const handleOnSearchChange = (value: string) => setSearchValue(value);

  const handleMoveVariant = () => {
    if (!selectedItem || !productId) {
      return;
    }

    move(
      { newProductId: productId, variantId: selectedItem.value },
      {
        onSuccess: () => {
          setSearchValue('');
          setSelectedItem(null);
          toast.success(`Вариант "${selectedItem.label}" перемещен`);
        },
      },
    );
  };

  function setOpen(isOpen: boolean) {
    if (isOpen) {
      handleOnSearchChange('');
    }
    setOpenState(isOpen);
  }

  return (
    <>
      <Label>Переместить вариант</Label>
      <div className={cn('flex items-center', className)}>
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild className="flex-1">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between rounded-r-none"
            >
              <span className="truncate flex items-center">
                {selectedItem?.label || 'Выберите вариант для перемещения'}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            style={{ width: 'var(--radix-popover-trigger-width)' }}
            className={cn('p-0')}
            align="center"
          >
            <Command shouldFilter={false}>
              <CommandInput
                value={searchValue}
                placeholder="Введите название или код"
                onValueChange={handleOnSearchChange}
              />
              <CommandList>
                <CommandEmpty></CommandEmpty>
                <CommandGroup>
                  {products.map((item) => {
                    if (!item.value) {
                      return null;
                    }
                    const isSelected = selectedItem?.value === item.value;
                    return (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        keywords={[item.label]}
                        onSelect={() => {
                          setSelectedItem(item);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto h-4 w-4',
                            isSelected ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                  <CommandItem
                    ref={ref}
                    className="invisible w-0 h-0 opacity-0"
                  />
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          type="button"
          onClick={() => setIsOpenAlertDialog(true)}
          disabled={isLoadingData || isLoadingMove || !selectedItem}
          className="rounded-l-none"
        >
          <MoveRight />
        </Button>
      </div>
      <AlertDialog open={isOpenAlertDialog} onOpenChange={setIsOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Подтвердите перемещение варианта
            </AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите переместить вариант{' '}
              <b>"{selectedItem?.label}"</b>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleMoveVariant}>
              Переместить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
