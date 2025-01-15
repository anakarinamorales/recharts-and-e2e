import { Dispatch, SetStateAction } from 'react';
import type { Meter } from '@/pages/api/metersData';

export type ErrorMessage = { message?: string };

export type MetersContextProps = {
  meters: Meter[] | null;
  queryError?: ErrorMessage | null;
  setMeterDataWasUpdated: Dispatch<SetStateAction<boolean>>;
  setMeters: (meters: Meter[]) => void;
};
export type ProviderProps = { children: React.ReactNode };
