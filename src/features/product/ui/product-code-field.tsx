import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDebouncedCallback } from '@/shared/hooks/use-debounced-callback';
import { Input } from '@/shared/ui/input';

import { useCheckProductCode } from '../model/use-check-product-code';

export const ProductCodeInput: FC<React.ComponentProps<'input'>> = ({
  name = 'productCode',
  onChange,
  ...props
}) => {
  const { setError, clearErrors } = useFormContext();

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
  }, 500);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    debouncedCheckCode(event.target.value);
  };

  return <Input {...props} onChange={handleOnChange} />;
};
