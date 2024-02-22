// @ts-nocheck
import { Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { BoxByStatus } from "../../components/Box/BoxByStatus";
import { Page } from "../../components/Page/Page";
import { CustomTable, StrictField } from "../../components/Table/Customtable";
import { useDevice } from "../../hooks/useDevice";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { IOrderRow } from "../../shared/types/order";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../contexts/SocketContext";
dayjs.extend(timezone);
dayjs.extend(utc);

export const List = () => {
  const { isMobile } = useDevice();
  const [myOrderList, setMyOrderList] = useState([]);
  const navigate = useNavigate();
  const wsServer = useContext(SocketContext);
  const fields: StrictField<IOrderRow>[] = [
    // {
    //   header: "Id",
    //   fieldKey: "id",
    //   width: 50,
    // },
    {
      header: "Ngày",
      fieldKey: "date",
      width: 300,
    },
    {
      header: "Giờ",
      fieldKey: "time",
      width: 300,
    },
    {
      header: "Trạng thái",
      fieldKey: "status",
      width: 300,
      render: ({ status }) => <BoxByStatus status={status} />,
    },
    {
      header: "Ngày tạo",
      fieldKey: "createdAt",
      width: 250,
      render: ({ createdAt }) => {
        return (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: 15, sm: 17 },
            }}
          >
            {dayjs(createdAt).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm")}
          </Typography>
        );
      },
    },
  ];

  const onViewDetail = ({ id }: IOrderRow) => {
    let path = SCREEN_PATHS.DETAIL;
    let arrPathBySlash = path.split("/");
    arrPathBySlash.pop();

    let newPathWithoutSlug = arrPathBySlash.join("/");
    navigate(`${newPathWithoutSlug}/${id}`);
  };

  const fetchMyListOrder = useCallback(async () => {
    const res = await getApi("order");
    if (res.success) setMyOrderList(res.data);
  }, []);

  useEffect(() => {
    fetchMyListOrder();
  }, []);

  useEffect(() => {
    wsServer.on("updateListOrder", () => {
      fetchMyListOrder();
    });
    return () => {
      wsServer.off("updateListOrder");
    };
  }, []);
  return (
    <Page title="Quản lý đơn đặt trứng">
      <CustomTable
        fields={fields}
        data={myOrderList}
        rows={myOrderList.length}
        onActionViewDetail={onViewDetail}
      />
    </Page>
  );
};
