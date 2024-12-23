export type MeterInterval = { timestamp: number; kwh: number };

export type Meter = {
  id: string;
  name: string;
  intervals: MeterInterval[];
};

export type MetersData = Meter[];

export const updateMeterData = async (
  body: string,
  meterId: string | number
) => {
  if (meterId) {
    const res = await fetch(`http://localhost:3001/meters/${meterId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await res.json();

    if (res.status === 404) {
      throw new Error(data.message);
    }

    return data;
  }
};

export const getMeters = async () => {
  const res = await fetch(`http://localhost:3001/meters`, {
    method: 'GET',
  });

  const data = await res.json();

  if (res.status === 404) {
    throw new Error(data.message);
  }
  
  return data;
};
