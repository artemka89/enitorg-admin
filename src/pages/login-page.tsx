import { type FC } from 'react';
import { Navigate } from 'react-router';

import { LoginForm, useGetUser } from '@/features/auth';
import { ROUTES } from '@/shared/routes';

export const LoginPage: FC = () => {
  const user = useGetUser();

  if (user.data?.id) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <LoginForm className="max-w-[450px] w-full" />
    </div>
  );
};
