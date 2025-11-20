import { type FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { Typography } from '@/shared/ui/typography';

interface OrderDescriptionTextProps {
  title: string;
  text: string;
  className?: string;
}

export const OrderDescriptionText: FC<OrderDescriptionTextProps> = ({
  title,
  text,
  className,
}) => {
  return (
    <Typography
      tag="p"
      size="base"
      className={cn(className, 'w-full flex gap-1')}
    >
      <span>{title}:</span>
      <span className="border-b border-foreground/80 border-dashed flex-1 mb-2" />
      <span className="font-semibold">{text}</span>
    </Typography>
  );
};
