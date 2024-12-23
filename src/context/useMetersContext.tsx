import { getMeters, Meter } from '@/pages/api/metersData';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type ErrorMessage = {message?: string}

export type MetersContextProps = {
  meters: Meter[] | null;
  queryError?: ErrorMessage | null;
  setMeters: (meters: Meter[]) => void;
  setMeterDataWasUpdated: Dispatch<SetStateAction<boolean>>;
};

export const defaultMetersContextProps: MetersContextProps = {
  meters: [],
  queryError: null,
  setMeters: ([]) => null,
  setMeterDataWasUpdated: () => false,
};

export const MetersContext = createContext(defaultMetersContextProps);

MetersContext.displayName = 'MetersContext';

export function useMetersContext() {
  const context = useContext(MetersContext);

  if (!context) {
    throw new Error('useMetersContext should be used within a MetersProvider');
  }
  
  return context;
}

export function MetersProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [metersData, setMetersData] = useState<Meter[] | null>(() => null);
  const [queryError, setQueryError] = useState<{message?: string}>();
  const [meterDataWasUpdated, setMeterDataWasUpdated] = useState<boolean>(() => false);
  
  useEffect(() => {
    const fetchMeterData = async () => {
      try {
        const data = await getMeters();
        setMetersData(data);
      } catch (error) {
        console.error(error);
        setQueryError(new Error('Something went wrong while loading meters data :('));
      }
    };
    if (meterDataWasUpdated || !metersData) {
      fetchMeterData();
      setMeterDataWasUpdated(false);
    }
  }, [meterDataWasUpdated, metersData]);

  const contextProps: MetersContextProps = {
    meters: metersData,
    queryError,
    setMeterDataWasUpdated,
    setMeters: setMetersData,
  };

  return (
    <MetersContext.Provider value={contextProps}>
      {!queryError && children}
      {queryError && <p>Oops! {queryError.message} </p>}
    </MetersContext.Provider>
  );
}
