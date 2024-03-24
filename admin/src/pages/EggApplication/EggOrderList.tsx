import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  OrderListParamsContext,
  OrderParams,
} from "../../contexts/OrderListParamsContext";
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
  const [myOrderList, setMyOrderList] = useState<IOrderRow[]>([]);
  const [params, setParams] = useState<OrderParams>({ status: ORDER_STATUS.WAITING_APPROVAL });
  const navigate = useNavigate();
  const { isMobile } = useDevice();
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
    const res = await getApi<IOrderRow[]>("order",params as unknown as Record<string, string>);
    if (res.success) setMyOrderList(res.data);
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
    <OrderListParamsContext.Provider
      value={{
        params: params,
        setParams: onSetParams,
      }}
    >
      {isMobile ? (
        <EggOrderListMobile
          myOrderList={myOrderList}
          onViewDetail={onViewDetail}
        />
      ) : (
        <EggOrderListDesktop
          myOrderList={myOrderList}
          onViewDetail={onViewDetail}
        />
      )}
    </OrderListParamsContext.Provider>
  );
};
