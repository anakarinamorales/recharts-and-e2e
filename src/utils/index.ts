import {
  MultipleBatteriesChartData,
  MultipleBatteriesChartProps,
} from '@/components/Chart/Chart.types';
import { Meter } from '@/pages/api/metersData';
import { formatInTimeZone } from 'date-fns-tz/formatInTimeZone';

export function getTzDate(date: Date) {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzDate = formatInTimeZone(date, clientTimezone, 'yyyy-MM-dd HH:mm:ss');

  return tzDate;
}

export function getChartData(meters: Meter[]): MultipleBatteriesChartProps {
  const chartData: Record<string, MultipleBatteriesChartData> = {};
  const chartColumns = new Set();

  meters?.forEach((battery) => {
    battery.intervals.forEach((interval) => {
      if (!chartData[interval.timestamp]) {
        chartData[interval.timestamp] = {
          timestamp: interval.timestamp,
          datetime: new Date(interval.timestamp).toLocaleString(),
        };
      }

      chartData[interval.timestamp][battery.name] = interval.kwh;
      chartColumns.add(battery.name);
    });
  });

  const timestamps = Object.keys(chartData).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const parsedData = timestamps.map((t) => chartData[t]);

  return {
    barsFillColors: ['#8884d8', '#ffc658'],
    barsKeys: Array.from(chartColumns) as string[],
    data: parsedData,
  };
}
