import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { WandSparkles } from 'lucide-react';

import { useDebouncedCallback } from '@/shared/hooks/use-debounced-callback';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

import { useCheckProductCode } from '../model/use-check-product-code';
import { useGenerateProductCode } from '../model/use-generate-product-code';

interface ProductCodeInputProps extends React.ComponentProps<'input'> {
  index: number;
}

export const ProductCodeInput: FC<ProductCodeInputProps> = ({
  index,
  name = 'productCode',
  onChange,
  ...props
}) => {
  const { setError, clearErrors, setValue } = useFormContext();

  const { mutate: generateCode, isPending: isLoadingGenerateCode } =
    useGenerateProductCode();
  const { mutate: checkCode } = useCheckProductCode();

  const debouncedCheckCode = useDebouncedCallback((code: string) => {
    if (!code) {
      clearErrors(name);
      return;
    }

    checkCode(code, {
      onSuccess: (data) => {
        if (data.exist) {
          setError(name, {
            type: 'manual',
            message: 'Товар с таким кодом уже существует',
          });
        } else {
          clearErrors(name);
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
        const nextCode = index === 0 ? data.code : Number(data.code) + index;
        setValue(name, nextCode.toString());
      },
    });
  };

  return (
    <div className="flex items-center">
      <Input {...props} onChange={handleOnChange} className="rounded-r-none" />
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-block">
            <Button
              type="button"
              onClick={handleOnGenerateCode}
              disabled={isLoadingGenerateCode}
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
