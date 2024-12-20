'use client';
import { Chart } from 'react-google-charts';
import { useMemo } from 'react';

import type { ChartData } from '@/components/Chart/Chart.types';
import type { MeterInterval, Meter } from '@/pages/api/metersData';

export default function SingleMeterChart({ meter }: { meter: Meter | null }) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const chartData = useMemo(() => {
    let chart = [['time', 'kvh']] as ChartData;

    meter?.intervals.forEach((item: MeterInterval) => {
      const kwh = item.kwh;
      const time = new Date(item.timestamp).toLocaleString();
      const newChartItem = [time, kwh];
      chart = [...chart, newChartItem] as ChartData;
    });

    return chart;
  }, [meter]);

  const chartOptions = {
    vAxis: {
      title: 'kwh',
    },
    hAxis: {
      title: `Date & Time | ${timezone}`,
    },
  };

  return (
    <>
      <Chart
        chartType='ColumnChart'
        data={chartData}
        height='100%'
        options={chartOptions}
        width='100%'
      />
    </>
  );
}
