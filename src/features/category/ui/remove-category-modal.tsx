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

interface RemoveCategoryModalProps {
  isProtected: boolean;
  categoryName: string;
  onRemove: () => void;
}

export const RemoveCategoryModal: FC<RemoveCategoryModalProps> = ({
  isProtected,
  categoryName,
  onRemove,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleSubmit = () => {
    onRemove();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
          <DialogTitle>Удаление категории</DialogTitle>
          <DialogDescription>
            {isProtected ? (
              'Категории с подкатегориями и продуктами удалить невозможно.'
            ) : (
              <>
                Вы действительно хотите удалить категорию{' '}
                <span className="font-semibold">"{categoryName}"</span> ?
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={isProtected}>
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
