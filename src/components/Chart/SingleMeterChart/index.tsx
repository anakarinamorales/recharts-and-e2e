import type { MeterInterval, Meter } from '@/pages/api/metersData';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

export default function SingleMeterChart({ meter }: { meter: Meter | null }) {
  const sortedArray = meter?.intervals
    ?.sort((interval1, interval2) => interval1.timestamp - interval2.timestamp)
    .map((item: MeterInterval) => ({
      date: new Date(item.timestamp).toLocaleString(),
      kwh: item.kwh,
    }));

  return (
    <>
      <ResponsiveContainer width='100%'>
        <BarChart  data={sortedArray} barSize={20}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar dataKey='kwh' fill='#8884d8' background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
