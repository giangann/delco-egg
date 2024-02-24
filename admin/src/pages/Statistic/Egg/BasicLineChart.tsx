import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
      series={[
        {
          data: [20000, 30000, 23113, 12567, 23113, 30000,12567,23113,12567,30000,12567,],
          label: "Mix 1",
        },
        {
          data: [33552, 12567, 23113, 30000, 12567, 30000,12567,30000,12567,12567,30000,],
          label: "Mix 2",
        },
        {
          data: [20000, 12567, 23113, 33552, 12567, 30000,23113,30000,23113,30000,23113,],
          label: "Mix 3",
        },
      ]}
      width={400}
      height={300}
      tooltip={{ trigger: "axis" }}
    />
  );
}
