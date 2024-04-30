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
import { IPagination } from "../../shared/types/base";
import { defaultPagi } from "../../shared/constants/common";
dayjs.extend(timezone);
dayjs.extend(utc);

// featch api
// layout by device
// filter bar
export const EggOrderList = () => {
  const [orderList, setOrderList] = useState<IOrderRow[]>([]);
  const [pagi, setPagi] = useState<IPagination>(defaultPagi);
  const { isMobile } = useDevice();
  const [params, setParams] = useState<OrderParams>({
    status: ORDER_STATUS.WAITING_APPROVAL,
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();
  const wsServer = useContext(SocketContext);

  const onViewDetail = ({ id }: IOrderRow) => {
    let newPathWithoutSlug = screenPathRemoveSlug(
      SCREEN_PATHS.MANAGE.APPLICATION.DETAIL
    );
    navigate(`${newPathWithoutSlug}/${id}`);
  };

  const onSetParams = (key: keyof OrderParams, value: any) => {
    setParams((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onClearParams = (key: keyof OrderParams) => {
    setParams((prev) => {
      delete prev[key];
      return { ...prev };
    });
  };

  const fetchMyListOrder = useCallback(async () => {
    const res = await getApi<IOrderRow[]>(
      "order",
      params as unknown as Record<string, string>
    );
    if (res.success) {
      setOrderList(res.data);
      setPagi(res.pagination || defaultPagi);
    }
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
        clearParams: onClearParams,
        onViewDetail,
        orderList,
        pagination: pagi,
      }}
    >
      {isMobile ? <EggOrderListMobile /> : <EggOrderListDesktop />}
    </OrderListContext.Provider>
  );
};
