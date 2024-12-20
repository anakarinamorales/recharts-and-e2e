export type MeterInterval = { timestamp: number; kwh: number };

export type Meter = {
  id: string;
  name: string;
  intervals: MeterInterval[];
};

export type MetersData = Meter[];
