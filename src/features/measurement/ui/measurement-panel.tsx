'use client';

import { type FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Settings } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { ScrollArea } from '@/shared/ui/scroll-area';

import { measurementApi } from '../model/api';
import { useAddMeasurement } from '../model/use-add-measurement';
import { useAddMeasurementUnit } from '../model/use-add-measurement-unit';

import { CreateMeasurementForm } from './create-measurement-form';
import { CreateMeasurementUnitForm } from './create-measurement-unit-form';
import { MeasurementCard } from './measurement-card';

export const MeasurementPanel: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: measurement, isLoading: isLoadingMeasurements } = useQuery(
    measurementApi.getAll(),
  );
  const { mutate: addMeasurement, isPending: isLoadingAddName } =
    useAddMeasurement();
  const { mutate: addUnit, isPending: isLoadingAddUnit } =
    useAddMeasurementUnit();

  const handleAddMeasurement = (name: string, unitIds?: string[]) => {
    addMeasurement({ name, unitIds });
  };

  const handleAddUnit = (name: string) => {
    addUnit({ name: name.trim() });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Управление измерениями</DialogTitle>
          <DialogDescription>
            Создайте или редактируйте измерения
          </DialogDescription>
        </DialogHeader>
        <div>
          <CreateMeasurementForm
            className="mb-4"
            isLoading={isLoadingAddName}
            onSubmit={handleAddMeasurement}
          />
          <CreateMeasurementUnitForm
            className="mb-4"
            isLoading={isLoadingAddUnit}
            onSubmit={handleAddUnit}
          />
          <ScrollArea className="h-[510px]">
            {!measurement?.items.length && !isLoadingMeasurements && (
              <div className="mt-4">
                <p className="text-center">Нет измерений</p>
              </div>
            )}
            {measurement?.items.map((item) => (
              <MeasurementCard
                key={item.id}
                measurement={item}
                units={measurement.units}
              />
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
