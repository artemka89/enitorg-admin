'use client';

import { useRef, useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

import { Badge } from '@/shared/ui/badge.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { Input } from '@/shared/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/ui/select.tsx';

import { type Measurement, type MeasurementUnit } from '../model/types.ts';
import { useUpdateMeasurement } from '../model/use-update-measurement.ts';

export function MeasurementCard({
  measurement,
  units,
}: {
  measurement: Measurement;
  units: MeasurementUnit[];
}) {
  const [isEdited, setIsEdited] = useState(false);

  const measurementNameInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateMeasurement, isPending: isLoadingUpdate } =
    useUpdateMeasurement();

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === measurement.name) {
      setIsEdited(false);
      return;
    }
    setIsEdited(true);
    return event.target.value;
  };

  const handleAddUnit = (unitId: string) => {
    updateMeasurement({
      id: measurement.id,
      name: measurement.name,
      unitIds: [...measurement.units.map((unit) => unit.id), unitId],
    });
  };

  const handleDeleteUnit = (unitId: string) => {
    updateMeasurement({
      id: measurement.id,
      name: measurement.name,
      unitIds: measurement.units
        .map((unit) => unit.id)
        .filter((id) => id !== unitId),
    });
  };

  const handleRenameMeasurement = () => {
    updateMeasurement({
      id: measurement.id,
      name: measurementNameInputRef.current?.value || measurement.name,
      unitIds: measurement.units.map((unit) => unit.id),
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm  mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Input
          ref={measurementNameInputRef}
          defaultValue={measurement.name}
          onChange={handleOnChangeName}
          className="disabled:disabled:opacity-100"
        />
        <Button
          onClick={handleRenameMeasurement}
          disabled={!isEdited || isLoadingUpdate}
        >
          <Save />
        </Button>
      </div>

      <div className="flex gap-2 justify-between items-start">
        <div className="flex flex-wrap gap-2">
          {measurement.units.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Без единиц измерения
            </p>
          )}
          {measurement.units.map((unit) => (
            <Badge
              key={unit.id}
              variant="secondary"
              className="pr-0 py-0 text-sm"
            >
              <span className="px-1">{unit.name}</span>
              <button
                onClick={() => handleDeleteUnit(unit.id)}
                className="rounded-full bg-muted-foreground/20 p-1 cursor-pointer hover:bg-destructive"
              >
                <X className="size-4" />
              </button>
            </Badge>
          ))}
        </div>
        <Select onValueChange={(unitId) => handleAddUnit(unitId)} value="">
          <SelectTrigger icon={<Plus />} className="ml-auto cursor-pointer" />
          <SelectContent align="end">
            {units.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
