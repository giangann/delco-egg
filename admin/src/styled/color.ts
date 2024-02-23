import { ORDER_STATUS } from "../shared/constants/orderStatus";

export const BLACK = {
  900: "#333333",
};
export const GREEN = {
  100: "#7bdcb5",
  200: "#00d084",
  500: "#06773f",
  600: "#05773f",
  900: "#333333",
};

export const BACKGROUND_COLOR = {
  HEADER: "#05773f",
};
export const BLUE = { 500: "#1976d2" };

const Orange = "#ed6c02";
const Green = "#06773f"; // GREEN["500"]
const Red = "#d32f2f";
const Purple = "#9c27b0";
const Blue = "#1976d2";

export enum COLOR_BG_STATUS {
  WAITING_APPROVAL = Orange,
  ACCEPTED = Green,
  SUCCESS = Blue,
  REJECTED = Red,
  CANCELED = Purple,
}

export function colorByStatus(status: ORDER_STATUS) {
  let color = "";
  switch (status) {
    case ORDER_STATUS.WAITING_APPROVAL:
      color = COLOR_BG_STATUS.WAITING_APPROVAL;
      break;
    case ORDER_STATUS.ACCEPTED:
      color = COLOR_BG_STATUS.ACCEPTED;
      break;
    case ORDER_STATUS.SUCCESS:
      color = COLOR_BG_STATUS.SUCCESS;
      break;
    case ORDER_STATUS.REJECTED:
      color = COLOR_BG_STATUS.REJECTED;
      break;
    case ORDER_STATUS.CANCELED:
      color = COLOR_BG_STATUS.CANCELED;
      break;

    default:
      break;
  }
  return color;
}
