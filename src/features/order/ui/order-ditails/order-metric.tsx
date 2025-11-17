import { type FC } from 'react';

import { Typography } from '@/shared/ui/typography';

interface OrderMetricProps {
  name: string;
  value: string | number;
  unit?: string;
  className?: string;
}

export const OrderMetric: FC<OrderMetricProps> = ({
  name,
  value,
  unit,
  className,
}) => {
  return (
    <div className={className}>
      <Typography size="sm" variant="muted" className="leading-relaxed">
        {name}:{' '}
      </Typography>
      <Typography size="lg" weight="semibold" className="leading-relaxed">
        {value} {unit}
      </Typography>
    </div>
  );
};
