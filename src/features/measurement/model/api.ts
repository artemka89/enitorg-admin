import { queryOptions } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/api-client';
import { API_ROUTES } from '@/shared/routes';

import type { Measurement } from './types';

export const measurementKey = 'measurements';

export const measurementApi = {
  getAll: () => {
    return queryOptions({
      queryKey: [measurementKey],
      queryFn: () =>
        apiClient<{ items: Measurement[] }>({
          url: API_ROUTES.measurements.base,
        }),
    });
  },
};
