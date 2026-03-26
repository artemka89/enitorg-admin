import { type FC, useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

interface RemoveOrderModalProps {
  isLoading: boolean;
  orderNumber: string;
  className?: string;
  onRemove: () => void;
}

export const RemoveOrderModal: FC<RemoveOrderModalProps> = ({
  isLoading,
  orderNumber,
  className,
  onRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleSubmit = () => {
    onRemove();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive/80 hover:text-destructive"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удаление заказа</DialogTitle>
          <DialogDescription>
            <strong>Это действие не обратимо!</strong> Вы действительно хотите
            удалить заказ <span className="font-semibold">"{orderNumber}"</span>{' '}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            Подтвердить
          </Button>
          <Button variant="destructive" type="button" onClick={handleClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
