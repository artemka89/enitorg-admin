import { type FC, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { ROUTES } from '@/shared/routes';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { LoginSchema, type LoginSchemaType } from '../model/form-schemas';
import { useLogin } from '../model/use-login';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate, error, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate(ROUTES.home);
      },
    });
  };

  return (
    <div className={cn(className, 'border shadow-xl p-6 pb-8 rounded-md')}>
      <div className="space-y-1">
        <h2 className="text-center text-2xl font-bold">Вход в аккаунт</h2>
        <p className="text-center">Введите ваш email и пароль для входа</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-4">
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="example@email.ru"
              className={cn('w-full pl-10', {
                ['border-destructive']: !!errors.email,
              })}
            />
          </div>
          {errors.email && (
            <span className="text-destructive ml-2 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="mb-2">
            Пароль
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Введите пароль"
              className={cn('w-full pl-10', {
                ['border-destructive']: !!errors.password,
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-0 right-0 h-full cursor-pointer px-3"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-destructive ml-2 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-destructive ml-2 text-sm">{error?.message}</div>
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          Войти
        </Button>
      </form>
    </div>
  );
};
