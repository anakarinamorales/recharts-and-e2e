import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from '@/components/Chart/Chart.module.css';

import type { MeterInterval, Meter } from '@/pages/api/metersData';

export default function SingleMeterChart({ meter }: { meter: Meter | null }) {
  const sortedArray = meter?.intervals
    ?.sort((interval1, interval2) => interval1.timestamp - interval2.timestamp)
    .map((item: MeterInterval) => ({
      date: new Date(item.timestamp).toLocaleString(),
      kwh: item.kwh,
    }));

  return (
    <>
      {meter?.name && <h2>{meter?.name}</h2>}
      <ResponsiveContainer height='60%' className={styles.chartContainer}>
        <BarChart data={sortedArray}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray={3} />
          <Bar dataKey='kwh' fill='var(--color-lilac)' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
