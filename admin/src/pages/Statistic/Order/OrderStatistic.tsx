import { PageMobile } from "../../../components/Page/PageMobile";
import { useDevice } from "../../../hooks/useDevice";
import { OrderStatusStatistic } from "./OrderStatusStatistic";
import { OrderTotalStatistic } from "./OrderTotalStatistic";

export const OrderStatistic = () => {
  const { isMobile } = useDevice();
  return (
    <>
      {isMobile ? (
        <PageMobile title="Thống kê đơn hàng">
          <OrderStatusStatistic />
          <OrderTotalStatistic />
        </PageMobile>
      ) : (
        <div>
          <OrderStatusStatistic />
          <OrderTotalStatistic />
        </div>
      )}
    </>
  );
};
