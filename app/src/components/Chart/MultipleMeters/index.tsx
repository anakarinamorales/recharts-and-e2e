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

import { getChartData } from '@/utils';
import { useMetersContext } from '@/context/useMetersContext';

import styles from '@/components/Chart/Chart.module.css';

import type { Meter } from '@/pages/api/metersData';

export default function MultipleMeters() {
  const { meters } = useMetersContext();

  const { data, barsKeys, barsFillColors } = getChartData(meters as Meter[]);

  return (
    <ResponsiveContainer height='60%' className={styles.chartContainer}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray={3} />
        <XAxis dataKey='datetime' />
        <YAxis />
        <Tooltip />
        <Legend />
        {barsKeys.map((key: string, index: number) => (
          <Bar
            dataKey={key}
            fill={barsFillColors[index]}
            key={key}
            stackId={key}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
