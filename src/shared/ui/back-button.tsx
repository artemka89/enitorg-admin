import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

import { Button } from './button';

interface BackButtonProps {
  className?: string;
}

export const BackButton: FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="link"
      onClick={() => navigate(-1)}
      className={cn(className, 'has-[>svg]:pl-0 gap-0 text-md')}
    >
      <ChevronLeft strokeWidth={3} className="size-5" />
      <span>Назад</span>
    </Button>
  );
};
