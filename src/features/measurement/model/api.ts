import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { API_ROUTES } from '@/shared/routes';

import type { Measurement, MeasurementUnit } from './types';

export const measurementKey = 'measurements';

export const measurementApi = {
  getAll: () => {
    return queryOptions({
      queryKey: [measurementKey],
      queryFn: () =>
        apiClient<{ items: Measurement[]; units: MeasurementUnit[] }>({
          url: API_ROUTES.measurements.base,
        }),
    });
  },
  add: (name: string, units?: string[]) => {
    return apiClient({
      url: API_ROUTES.measurements.add,
      method: 'POST',
      body: {
        name,
        units,
      },
    });
  },
  update: (id: string, name: string, units?: string[]) => {
    return apiClient({
      url: API_ROUTES.measurements.update(id),
      method: 'PUT',
      body: {
        name,
        units,
      },
    });
  },
  addUnit: (name: string) => {
    return apiClient({
      url: API_ROUTES.measurements.addUnit,
      method: 'POST',
      body: {
        name,
      },
    });
  },
};
