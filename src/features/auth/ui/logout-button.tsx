import { type FC } from 'react';
import { LogOut } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { useLogout } from '../model/use-logout';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <Button variant="outline" className={className} onClick={handleLogout}>
      <LogOut />
      Выйти
    </Button>
  );
};
