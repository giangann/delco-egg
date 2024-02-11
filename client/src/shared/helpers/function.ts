import dayjs from "dayjs";
import { CONFIG } from "../constants/common";
import { IOrderItem } from "../types/order";
import { IEggPriceQty } from "../types/egg";

export const generateDealPrices = (originPrice: number, step: number) => {
  return [
    originPrice,
    originPrice - step,
    originPrice - step * 2,
    originPrice - step * 3,
  ];
};

export function isToday(day: Date | string) {
  const today = dayjs();
  return dayjs(day).isSame(today.format(CONFIG.MY_SQL_DATE_FORMAT));
}
export function isTomorrow(day: Date | string) {
  const today = dayjs();
  return dayjs(day).isSame(
    today.add(1, "day").format(CONFIG.MY_SQL_DATE_FORMAT)
  );
}

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

export function timeToHHMMNN(time: string | null | undefined) {
  if (!time) return null;
  let timeArr = time.split(":");
  console.log("timearr", timeArr);

  let hhmmss = {
    hour: Number(timeArr[0]),
    minute: Number(timeArr?.[1]),
    second: Number(timeArr?.[2]),
  };
  console.log(hhmmss);

  return hhmmss;
}

// create form - step 1
// check if current eggPriceQty entity have or not
// existed inside order items
// if existed: return this orderItem, if not return undefined
export function eggPriceQtyInOrderItem(
  orderItems: IOrderItem[] | null | undefined,
  egg: IEggPriceQty
) {
  if (orderItems == null || orderItems == undefined) return undefined;
  const foundOrderItems = orderItems.filter(
    (order) => order.egg_id === egg.egg_id
  );

  if (foundOrderItems && foundOrderItems?.length) {
    return foundOrderItems[0];
  } else return undefined;
}
