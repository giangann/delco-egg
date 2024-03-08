import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { CHART_COLORS } from "../../../shared/constants/common";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<"line"> = {
  // this make both dataset value display in tooltip
  interaction: {
    mode: "index" as const,
    intersect: false,
  },

  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 16,
          family: "Montserrat",
          weight: 550,
        },
      },
    },
    title: {
      display: true,
      text: "Biểu đồ giá trứng",
      font: {
        size: 18,
        family: "Montserrat",
        weight: 650,
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
    // -----just make neareast dataset value display in tooltip--------
    // tooltip: {
    //   intersect: false,
    // },
  },
};
export type TChart = {
  labels: string[];
  datasets: {
    label: string;
    data: any[];
  }[];
};
export const EggPriceHistoryChart = ({ chartData }: { chartData: TChart }) => {
  const { labels, datasets } = chartData;

  let newDatasets = datasets.map((data, index) => {
    return {
      ...data,
      borderColor: CHART_COLORS.BORDER[index],
      backgroundColor: CHART_COLORS.BG[index],
    };
  });
  return (
    <Line
      data={{
        labels: labels,
        datasets: newDatasets,
      }}
      options={options}
    />
  );
};
