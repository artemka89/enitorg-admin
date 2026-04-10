import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { FormItem, FormLabel } from '@/shared/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { measurementApi } from '../model/api';

interface MeasurementSelectProps {
  basePath: string;
  disabled?: boolean;
}

export const MeasurementSelect: React.FC<MeasurementSelectProps> = ({
  basePath,
  disabled,
}) => {
  const { watch, setValue } = useFormContext();
  const { data: measurements, isLoading } = useQuery(measurementApi.getAll());

  const measurementId = watch(`${basePath}.measurementNameId`);
  const unitId = watch(`${basePath}.measurementUnitId`);

  const selectedMeasurement = measurements?.items.find(
    (m) => m.id === measurementId,
  );

  const handleMeasurementChange = (newMeasurementId: string) => {
    const measurement = measurements?.items.find(
      (m) => m.id === newMeasurementId,
    );

    setValue(`${basePath}.measurementNameId`, newMeasurementId, {
      shouldValidate: true,
    });
    setValue(`${basePath}.measurementName`, measurement?.name || '', {
      shouldValidate: true,
    });

    setValue(`${basePath}.measurementUnitId`, '', { shouldValidate: true });
    setValue(`${basePath}.measurementUnit`, '', { shouldValidate: true });
  };

  const handleUnitChange = (newUnitId: string) => {
    const unit = selectedMeasurement?.units.find((u) => u.id === newUnitId);

    setValue(`${basePath}.measurementUnitId`, newUnitId, {
      shouldValidate: true,
    });
    setValue(`${basePath}.measurementUnit`, unit?.name || '', {
      shouldValidate: true,
    });
  };

  return (
    <>
      <div className="flex-1">
        <FormItem>
          <FormLabel>Название изм.</FormLabel>
          <Select
            value={measurementId || undefined}
            onValueChange={handleMeasurementChange}
            disabled={isLoading || disabled}
          >
            <SelectTrigger className="w-full min-w-[150px]">
              <SelectValue placeholder="Измерение" />
            </SelectTrigger>
            <SelectContent>
              {measurements?.items.map((measurement) => (
                <SelectItem key={measurement.id} value={measurement.id}>
                  {measurement.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>

      <div className="flex-1">
        <FormItem>
          <FormLabel>Единица изм.</FormLabel>
          <Select
            value={unitId || undefined}
            onValueChange={handleUnitChange}
            disabled={
              !selectedMeasurement?.units.length || isLoading || disabled
            }
          >
            <SelectTrigger className="w-full min-w-[150px]">
              <SelectValue placeholder="Единица" />
            </SelectTrigger>
            <SelectContent>
              {selectedMeasurement?.units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>
    </>
  );
};
