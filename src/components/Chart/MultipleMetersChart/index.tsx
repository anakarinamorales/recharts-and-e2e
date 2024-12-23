// import { useEffect, useState } from 'react';
// import Chart from 'react-google-charts';
// import { Meter, MeterInterval } from '@/pages/api/metersData';
// import { useMetersContext } from '@/context/useMetersContext';

// import type { ChartData } from '@/components/Chart/Chart.types';

export default function MultipleMetersChart() {
  // const { meters } = useMetersContext();
  // const [chartData, setChartData] = useState<ChartData>(() => [
  //   ['Date/Time', 'Battery A', 'Battery B'],
  // ]);
  // const CHART_COLUMNS_QTD = chartData[0].length; // because of the chart library, the first element must always to be the columns of the chart
  // console.log(CHART_COLUMNS_QTD);

  // useEffect(() => {
  //   if (meters?.length) {
  //     const tempChartData = [['Date/Time', 'Battery A', 'Battery B']];
  //     const auxArray: (string | number)[][] = [];

  //     // const biggestIntervalsArray = meters.reduce((acc, currentMeter) => (currentMeter.intervals.length > acc ? currentMeter.intervals.length : acc), 0);
  //     // const arr = Array(biggestIntervalsArray).fill([
  //     //   new Date().toLocaleString(),
  //     //   0,
  //     //   0,
  //     // ]);

  //     // fill in date/time and consumption for batteries all meters
  //     meters.forEach((meter: Meter, meterIndex: number) => {
  //       const isFirstMeter = meterIndex === 0;
  //       // for (
  //       //   let intervalIndex = 0;
  //       //   intervalIndex < biggestIntervalsArray;
  //       //   intervalIndex++
  //       // ) {
  //       //   if (isFirstMeter) {
  //       //     auxArray
  //       //     auxArray.push([
  //       //       new Date(meter[intervalIndex].timestamp).toLocaleString(),
  //       //       interval.kwh,
  //       //     ]);
  //       //     return;
  //       //   } else {
  //       //     auxArray[index].push(interval.kwh);
  //       //   }
  //       // }

  //       meter.intervals.forEach((interval: MeterInterval, index: number) => {
  //         console.log(interval);
  //         // if it's first meter, updates the array with the date of the measurment and the kwh value
  //         if (isFirstMeter) {
  //           auxArray.push([
  //             new Date(interval.timestamp).toLocaleString(),
  //             interval.kwh,
  //           ]);
  //           return;
  //         } else {
  //           // console.log(11111111, index);
  //           // if it's not first meter, updates the array with only the kwh of that meter on that day
  //           // considering the measurment dates of the second meter are the same as the first one
  //           auxArray[index].push(interval.kwh);
  //         }
  //       });
  //     });

  //     chartData.push(...tempChartData, ...auxArray);
  //     setChartData(chartData);
  //   }
  // }, [chartData, meters]);

  // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // const options = {
  //   chartArea: { width: '50%' },
  //   colors: ['#750085', '#0000E0'],
  //   hAxis: {
  //     title: 'kwh',
  //     minValue: 0,
  //   },
  //   title: 'Battery A vs. Battery B (kwh)', // make this title dinamic
  //   vAxis: {
  //     title: `Date & Time | ${timezone}`,
  //   },
  // };

  return (
    <></>
    // <Chart
    //   chartType='BarChart'
    //   width='100%'
    //   height='100%'
    //   data={chartData}
    //   options={options}
    //   legendToggle
    // />
  );
}
