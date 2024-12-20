import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Meter } from '@/pages/api/metersData';
import SingleMeterChart from '@/components/Chart/SingleMeterChart';
import PageLayout from '@/components/PageLayout';

// type CustomError = { message: string, type: number};

export default function MeterData() {
  const router = useRouter();
  const [meter, setMeter] = useState<Meter | null>(() => null);
  const [error, setError] = useState<string>(() => '');

  useEffect(() => {
    const fetchMeterData = async () => {
      if (router.query.id) {
        try {
          const res = await fetch(
            `http://localhost:3001/meters/${router.query.id}`,
            {
              method: 'GET',
            }
          );

          const data = await res.json();

          if (res.status === 404) {
            throw new Error(data.message);
          }

          setMeter(data);
        } catch (error) {
          console.error(error);
          setError(
            '(404) Oops! We are currently unable to find the meter you requested.'
          );
        }
      }
    };
    fetchMeterData();
  }, [router.query.id]);

  return (
    <PageLayout>
      <h1>Meter Data</h1>
      {error ? (
        <span>{error}</span>
      ) : (
        <>
          <h2>
            | {meter?.name}
            <SingleMeterChart meter={meter} />
          </h2>
        </>
      )}
    </PageLayout>
  );
}
