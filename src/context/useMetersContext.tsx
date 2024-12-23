import { Meter } from '@/pages/api/metersData';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

export type MetersContextProps = {
  meters: Meter[] | null;
  queryError?: ErrorConstructor | null;
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
  const [queryError, setQueryError] = useState<
    ErrorConstructor | null
    >(() => null);
  const [meterDataWasUpdated, setMeterDataWasUpdated] = useState<boolean>(() => false);
  
  useEffect(() => {
    const fetchMeterData = async () => {
      try {
        const res = await fetch(`${process.env.SERVER_BASE_URL}`, {
          method: 'GET',
        });

        const data = await res.json();

        if (res.status === 404) {
          throw new Error(data.message);
        }

        setMetersData(data);
      } catch (error) {
        console.error(error);
        setQueryError(error as ErrorConstructor);
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
      {children}
    </MetersContext.Provider>
  );
}
