import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { WandSparkles } from 'lucide-react';

import { useDebouncedCallback } from '@/shared/hooks/use-debounced-callback';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

import { useCheckProductCode } from '../model/use-check-product-code';
import { useGenerateProductCode } from '../model/use-generate-product-code';

interface ProductCodeInputProps extends React.ComponentProps<'input'> {
  fieldName: string;
  index: number;
}

export const ProductCodeInput: FC<ProductCodeInputProps> = ({
  fieldName,
  onChange,
  className,
  ...props
}) => {
  const { setError, clearErrors, setValue } = useFormContext();

  const { mutate: generateCode, isPending: isLoadingGenerateCode } =
    useGenerateProductCode();
  const { mutate: checkCode } = useCheckProductCode();

  const debouncedCheckCode = useDebouncedCallback((code: string) => {
    if (!code) {
      clearErrors(fieldName);
      return;
    }

    checkCode(code, {
      onSuccess: (data) => {
        if (data.exist) {
          setError(fieldName, {
            type: 'manual',
            message: 'Товар с таким кодом уже существует',
          });
        } else {
          clearErrors(fieldName);
        }
      },
    });
  }, 1000);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    debouncedCheckCode(event.target.value);
  };

  const handleOnGenerateCode = () => {
    generateCode(undefined, {
      onSuccess: (data) => {
        setValue(fieldName, data.code);
      },
      onSettled: () => {
        clearErrors(fieldName);
      },
    });
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Input {...props} onChange={handleOnChange} className="rounded-r-none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block">
            <Button
              type="button"
              onClick={handleOnGenerateCode}
              disabled={isLoadingGenerateCode || props.disabled}
              className="rounded-l-none"
            >
              <WandSparkles className="h-4 w-4" />
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-56 text-center">
          Сгенерировать
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
