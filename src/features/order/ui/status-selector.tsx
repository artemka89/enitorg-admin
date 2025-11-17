import { type FC, useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/shared/lib/cn';
import { ConfirmModal } from '@/shared/ui/confirm-modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { STATUSES } from '../model/constants';
import { getStatusList } from '../model/helpers';
import type { OrderStatus } from '../model/types';
import { useUpdateOrderStatus } from '../model/use-update-order-status';

interface StatusSelectorProps {
  orderId: string;
  currentStatus: OrderStatus;
  className?: string;
}

export const StatusSelector: FC<StatusSelectorProps> = ({
  orderId,
  currentStatus,
  className,
}) => {
  const [confirStatus, setConfirmStatus] = useState<OrderStatus | null>(null);

  const { mutate, isPending } = useUpdateOrderStatus();

  const statuses = getStatusList(currentStatus);

  const handleUpdateStatus = (value: OrderStatus) => {
    mutate(
      { id: orderId, status: value },
      {
        onSuccess: () => {
          toast.success(`Статус заказа изменен на ${STATUSES[value].text}`);
          setConfirmStatus(null);
        },
      },
    );
    setConfirmStatus(null);
  };

  return (
    <>
      <Select
        value={currentStatus}
        disabled={isPending || STATUSES[currentStatus].dissabled}
        onValueChange={(value) => setConfirmStatus(value as OrderStatus)}
      >
        <SelectTrigger
          className={cn(
            className,
            "cursor-pointer [&_svg:not([class*='text-'])]:text-white hover:bg-muted-foreground",
            STATUSES[currentStatus].color,
          )}
        >
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem
              key={status.value}
              value={status.value}
              disabled={status.disabled}
              className={cn('cursor-pointer my-1 ')}
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {confirStatus && (
        <ConfirmModal
          isOpen={!!confirStatus}
          setIsOpen={() => setConfirmStatus(null)}
          title={'Обновление статуса'}
          description={
            <p className="text-base">
              Вы действительно хотите обновить статус{' '}
              <span className="font-bold">{STATUSES[confirStatus].text}</span>?
            </p>
          }
          onRemove={() => handleUpdateStatus(confirStatus)}
        />
      )}
    </>
  );
};
