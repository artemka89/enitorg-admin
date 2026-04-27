import { useMutation } from '@tanstack/react-query';

import { measurementApi, measurementKey } from './api';

export const useUpdateMeasurement = () => {
  return useMutation({
    mutationFn: (data: { id: string; name: string; unitIds?: string[] }) =>
      measurementApi.update(data.id, data.name, data.unitIds),
    meta: {
      invalidateQueries: [[measurementKey]],
    },
  });
};
