import { OrderStatusStatistic } from "./OrderStatusStatistic";
import { OrderTotalStatistic } from "./OrderTotalStatistic";

export const OrderStatistic = () => {
  return (
    <div>
      <OrderStatusStatistic />
      <OrderTotalStatistic/>
    </div>
  );
};
