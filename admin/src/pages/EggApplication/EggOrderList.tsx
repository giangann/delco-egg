import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderListContext, OrderParams } from "../../contexts/OrderListContext";
import { SocketContext } from "../../contexts/SocketContext";
import { useDevice } from "../../hooks/useDevice";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { screenPathRemoveSlug } from "../../shared/helper";
import { IOrderRow } from "../../shared/types/order";
import { EggOrderListDesktop } from "./EggOrderListDesktop";
import { EggOrderListMobile } from "./EggOrderListMobile";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";
dayjs.extend(timezone);
dayjs.extend(utc);

// featch api
// layout by device
// filter bar
export const EggOrderList = () => {
  const [orderList, setOrderList] = useState<IOrderRow[]>([]);
  const { isMobile } = useDevice();
  const [params, setParams] = useState<OrderParams>({
    status: isMobile ? ORDER_STATUS.WAITING_APPROVAL : null,
  });
  const navigate = useNavigate();
  const wsServer = useContext(SocketContext);

  const onViewDetail = ({ id }: IOrderRow) => {
    let newPathWithoutSlug = screenPathRemoveSlug(
      SCREEN_PATHS.MANAGE.APPLICATION.DETAIL
    );
    navigate(`${newPathWithoutSlug}/${id}`);
  };

  const onSetParams = (_key: keyof OrderParams, value: any) => {
    let newParams = {
      ...params,
      [_key]: value,
    };
    setParams(newParams);
  };

  const fetchMyListOrder = useCallback(async () => {
    const res = await getApi<IOrderRow[]>(
      "order",
      params as unknown as Record<string, string>
    );
    if (res.success) setOrderList(res.data);
  }, [params]);

  useEffect(() => {
    fetchMyListOrder();
  }, [params]);

  useEffect(() => {
    wsServer.on("updateListOrder", (message) => {
      console.log(message);
      fetchMyListOrder();
    });
    return () => {
      wsServer.off("updateListOrder");
    };
  }, []);

  return (
    <OrderListContext.Provider
      value={{
        params: params,
        setParams: onSetParams,
        onViewDetail,
        orderList,
      }}
    >
      {isMobile ? <EggOrderListMobile /> : <EggOrderListDesktop />}
    </OrderListContext.Provider>
  );
};
