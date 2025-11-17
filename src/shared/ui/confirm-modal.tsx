import React, { type FC } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface ConfirmModalModalProps {
  title: string;
  description: React.ReactNode | string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onRemove: () => void;
}

export const ConfirmModal: FC<ConfirmModalModalProps> = ({
  title,
  description,
  isOpen,
  setIsOpen,
  onRemove,
}) => {
  const handleSubmit = () => {
    onRemove();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Подтвердить
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
