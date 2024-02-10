import dayjs from "dayjs";
import { CONFIG } from "../constants/common";

export const generateDealPrices = (originPrice: number, step: number) => {
  return [
    originPrice,
    originPrice - step,
    originPrice - step * 2,
    originPrice - step * 3,
  ];
};

// day is msql date column type with format YYYY-MM-DD
export function toDayOrTomorrowOrYesterday(day: Date | string) {
  const today = dayjs();
  const isTomorrow = dayjs(day).isSame(
    today.add(1, "day").format(CONFIG.MY_SQL_DATE_FORMAT)
  );
  const isToday = dayjs(day).isSame(today.format(CONFIG.MY_SQL_DATE_FORMAT));
  const isYesterday = dayjs(day).isSame(
    today.subtract(1, "day").format(CONFIG.MY_SQL_DATE_FORMAT)
  );
  if (isToday) return "Hôm nay";
  if (isTomorrow) return "Ngày mai";
  if (isYesterday) return "Hôm qua";
  return false;
}

export function commonDate() {
  const today = dayjs().format("DD/MM/YYYY");
  const tomorrow = dayjs().add(1, "day").format("DD/MM/YYYY");
  const twoDaysAgo = dayjs().add(2, "day").format("DD/MM/YYYY");

  return { today, tomorrow, twoDaysAgo };
}


export function commonDateWithMySqlFormat() {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const twoDaysAgo = dayjs().add(2, "day").format("YYYY-MM-DD");

  return { today, tomorrow, twoDaysAgo };
}