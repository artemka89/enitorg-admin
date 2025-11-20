import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';

import { useGetUser } from '../model/use-get-user';

interface GreeningUserProps {
  className?: string;
}

export const GreeningUser: FC<GreeningUserProps> = ({ className }) => {
  const user = useGetUser();

  return (
    <div className={cn(className)}>{user.data?.name || user.data?.email}</div>
  );
};
