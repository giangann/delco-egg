import { TestCustomTabs } from "./TestCustomTabs";
import { OrderStatisticTimePanel } from "./OrderStatisticTimePanel";
import { OrderStatisticTimeRange } from "./OrderStatisticTimeRange";

export const OrderStatistic = () => {
  return (
    <div>
      <OrderStatisticTimeRange />
      <OrderStatisticTimePanel/>
      <TestCustomTabs/>
    </div>
  );
};
