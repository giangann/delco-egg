type ComponentProps = {
  data: number[];
};

import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ORDER_STATUS_LABEL } from "../../../shared/constants/orderStatus";
import faker from "faker";
import { COLOR_BG_STATUS } from "../../../styled/color";
import { OPACITY_TO_HEX } from "../../../shared/constants/common";
import { sumOfNumberArr } from "../../../shared/helper";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export const OrderStatusStatisticDoughnut = ({ data }: ComponentProps) => {
  const labels = [
    ORDER_STATUS_LABEL.ACCEPTED,
    ORDER_STATUS_LABEL.REJECTED,
    ORDER_STATUS_LABEL.SUCCESS,
    ORDER_STATUS_LABEL.CANCELED,
    ORDER_STATUS_LABEL.WAITING_APPROVAL,
  ];
  const orderData = {
    labels: labels,
    datasets: [
      {
        label: "Số đơn",
        data:
          data || labels.map(() => faker.datatype.number({ min: 2, max: 50 })),
        backgroundColor: [
          `${COLOR_BG_STATUS.ACCEPTED}${OPACITY_TO_HEX["20"]}`,
          `${COLOR_BG_STATUS.REJECTED}${OPACITY_TO_HEX["20"]}`,
          `${COLOR_BG_STATUS.SUCCESS}${OPACITY_TO_HEX["20"]}`,
          `${COLOR_BG_STATUS.CANCELED}${OPACITY_TO_HEX["20"]}`,
          `${COLOR_BG_STATUS.WAITING_APPROVAL}${OPACITY_TO_HEX["20"]}`,
        ],
        borderColor: [
          COLOR_BG_STATUS.ACCEPTED,
          COLOR_BG_STATUS.REJECTED,
          COLOR_BG_STATUS.SUCCESS,
          COLOR_BG_STATUS.CANCELED,
          COLOR_BG_STATUS.WAITING_APPROVAL,
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {sumOfNumberArr(data) == 0 ? (
        <Typography fontSize = {18} textAlign={'center'} color={'red'}>{"Không có đơn hàng trong khoảng thời gian"}</Typography>
      ) : (
        <Doughnut data={orderData} options={options} />
      )}
    </>
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
