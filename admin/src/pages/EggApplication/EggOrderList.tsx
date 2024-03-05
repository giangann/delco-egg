import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../contexts/SocketContext";
import { useDevice } from "../../hooks/useDevice";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { IOrderRow } from "../../shared/types/order";
import { EggOrderListDesktop } from "./EggOrderListDesktop";
import { EggOrderListMobile } from "./EggOrderListMobile";
import { screenPathRemoveSlug } from "../../shared/helper";
dayjs.extend(timezone);
dayjs.extend(utc);

export const EggOrderList = () => {
  const [myOrderList, setMyOrderList] = useState<IOrderRow[]>([]);
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const wsServer = useContext(SocketContext);

  const onViewDetail = ({ id }: IOrderRow) => {
    let newPathWithoutSlug = screenPathRemoveSlug(
      SCREEN_PATHS.APPLICATION.DETAIL
    );
    navigate(`${newPathWithoutSlug}/${id}`);
  };

  const fetchMyListOrder = useCallback(async () => {
    const res = await getApi<IOrderRow[]>("order");
    if (res.success) setMyOrderList(res.data);
  }, []);

  useEffect(() => {
    fetchMyListOrder();
  }, []);

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
    <>
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
    </>
  );
};
