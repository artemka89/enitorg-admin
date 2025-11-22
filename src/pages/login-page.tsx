import { type FC } from 'react';
import { Navigate } from 'react-router';

import { LoginForm, useGetUser } from '@/features/auth';
import { ThemeToggleButton } from '@/features/theme-toggle';
import { ROUTES } from '@/shared/routes';

export const LoginPage: FC = () => {
  const user = useGetUser();

  if (user.data?.id) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return (
    <div className="relative min-w-screen min-h-screen flex items-center justify-center">
      <ThemeToggleButton className="absolute top-6 right-6" />
      <LoginForm className="max-w-[450px] w-full" />
    </div>
  );
};
