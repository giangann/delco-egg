import { Box } from "@mui/material";
import { ChartOptions } from "chart.js";
import faker from "faker";
import { Doughnut } from "react-chartjs-2";
import { CHART_COLORS } from "../../shared/constants/common";
import { TPieChartData } from "./ClientDetailEggStatistic";

export const ClientDetailEggStatisticChart = ({
  data,
}: {
  data: TPieChartData;
}) => {
  const defaultLabels = ["Mix 1", "Mix 2", "Mix 3", "Mix 4"];
  const statisticData = {
    labels: data.labels,
    datasets: [
      {
        label: "Tổng số tiền",
        data:
          data.totalDatas ||
          defaultLabels.map(() => faker.datatype.number({ min: 2, max: 50 })),
        backgroundColor: defaultLabels.map(
          (_label, index) => CHART_COLORS.BG[index]
        ),
        borderColor: defaultLabels.map(
          (_label, index) => CHART_COLORS.BORDER[index]
        ),
        borderWidth: 1,
      },
      {
        label: "Tổng số lượng",
        data:
          data.qtyDatas ||
          defaultLabels.map(() => faker.datatype.number({ min: 2, max: 50 })),
        backgroundColor: defaultLabels.map(
          (_label, index) => CHART_COLORS.BG[index]
        ),
        borderColor: defaultLabels.map(
          (_label, index) => CHART_COLORS.BORDER[index]
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Doughnut data={statisticData} options={options} />
    </Box>
  );
};
const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 16,
          family: "Montserrat",
          weight: 550,
        },
      },
    },
    tooltip: {
      titleFont: {
        size: 16,
        family: "Montserrat",
        weight: 550,
      },
      bodyFont: {
        size: 16,
        family: "Montserrat",
        weight: 550,
      },
    },
  },
};
