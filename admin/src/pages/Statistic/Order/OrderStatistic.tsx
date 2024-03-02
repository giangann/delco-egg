import { OrderStatusStatistic } from "./OrderStatusStatistic";
import { OrderStatisticTimeRange } from "./OrderStatisticTimeRange";

export const OrderStatistic = () => {
  return (
    <div>
      <OrderStatisticTimeRange />
      <OrderStatusStatistic />
    </div>
  );
};
