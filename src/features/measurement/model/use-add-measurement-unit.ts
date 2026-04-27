import { useMutation } from '@tanstack/react-query';

import { measurementApi, measurementKey } from './api';

export const useAddMeasurementUnit = () => {
  return useMutation({
    mutationFn: (data: { name: string }) => measurementApi.addUnit(data.name),
    meta: {
      invalidateQueries: [[measurementKey]],
    },
  });
};
