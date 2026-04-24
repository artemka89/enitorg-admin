import { useMutation } from '@tanstack/react-query';

import { measurementApi, measurementKey } from './api';

export const useAddMeasurement = () => {
  return useMutation({
    mutationFn: (data: { name: string; unitIds?: string[] }) =>
      measurementApi.add(data.name, data.unitIds),
    meta: {
      invalidateQueries: [[measurementKey]],
    },
  });
};
