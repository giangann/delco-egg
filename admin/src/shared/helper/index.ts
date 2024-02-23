import dayjs from "dayjs";
import { CONFIG } from "../constants/common";
import { EggPrice } from "../types/egg-price-qty";
import { IOrderItem } from "../types/order";

export function fakeDelay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export function timeWithoutSecond(time: string) {
  // HH:mm:ss - default time column type mysql
  let arr = time.split(":");
  arr.pop();
  return arr.join(":");
}

export function numberWithComma(number: number) {
  let arr = number.toString().split("");
  let j = 1;
  let result = "";
  for (let i = arr.length - 1; i >= 0; i--) {
    result += arr[i];
    if (j && i !== 0 && j % 3 === 0) {
      result += ",";
      j = 0;
    }
    j += 1;
  }

  let result2 = result.split("");
  let final = result2.reverse().join("");
  return final;
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

//
export function eggPriceInputToNumber(eggPrice: EggPrice) {
  if (Number.isNaN(parseInt(eggPrice as string))) {
    return null;
  } else {
    return parseInt(eggPrice as string);
  }
}

export function diffDateTimeWithNow(dateTime: string | Date) {
  let res = "";
  const diffYear = dayjs().diff(dateTime, "year");
  if (diffYear) return (res = diffYear + " năm trước");

  const diffMonth = dayjs().diff(dateTime, "month");
  if (diffMonth) return (res = diffMonth + " tháng trước");

  const diffWeek = dayjs().diff(dateTime, "week");
  if (diffWeek) return (res = diffWeek + " tuần trước");

  const diffDay = dayjs().diff(dateTime, "day");
  if (diffDay) return (res = diffDay + " ngày trước");

  const diffHour = dayjs().diff(dateTime, "hour");
  if (diffHour) return (res = diffHour + " giờ trước");

  const diffMinute = dayjs().diff(dateTime, "minute");
  if (diffMinute) return (res = diffMinute + " phút trước");
  else return (res = "Vừa xong");
}

export function subtotal(items: IOrderItem[]) {
  return items
    .map(({ deal_price, quantity }) => deal_price * quantity)
    .reduce((sum, i) => sum + i, 0);
}

export function orderItemsToTotalMoney(items: IOrderItem[] | undefined) {
  if (!items) return "null"
  let money = items
    .map(({ deal_price, quantity }) => deal_price * quantity)
    .reduce((sum, i) => sum + i, 0);
  return numberWithComma(money);
}
