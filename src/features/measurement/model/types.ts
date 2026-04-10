export interface Measurement {
  id: string;
  name: string;
  units: MeasurementUnit[];
}

export interface MeasurementUnit {
  id: string;
  name: string;
}
