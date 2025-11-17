import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';

interface StatusSelectorProps {
  className?: string;
}

export const StatusSelector: FC<StatusSelectorProps> = ({ className }) => {
  return <div className={cn(className)}>StatusSelector</div>;
};
