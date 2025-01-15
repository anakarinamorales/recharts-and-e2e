export type SingleBatteryChartDataValues = (string | number)[];
export type SingleBatteryChartData = SingleBatteryChartDataValues[];
export type MultipleBatteriesChartData = Record<string, number | string>;
export type MultipleBatteriesChartProps = {
  barsFillColors: string[];
  barsKeys: string[];
  data: MultipleBatteriesChartData[];
};
