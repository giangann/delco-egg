import dayjs from "dayjs";
import { CONFIG } from "../constants/common";

export function fakeDelay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("time out run");
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
    if (j && j % 3 === 0) {
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
  let labelReturn;
  const today = dayjs();
  const isTomorrow = dayjs(day).isSame(
    today.add(1, "day").format(CONFIG.MY_SQL_DATE_FORMAT)
  );
  const isToday = dayjs(day).isSame(today.format(CONFIG.MY_SQL_DATE_FORMAT));
  const isYesterday = dayjs(day).isSame(
    today.subtract(1, "day").format(CONFIG.MY_SQL_DATE_FORMAT)
  );
  if (isToday) return (labelReturn = "Hôm nay");
  if (isTomorrow) return (labelReturn = "Ngày mai");
  if (isYesterday) return (labelReturn = "Hôm qua");
  return false;
}
