import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { Page } from "../../components/Page/Page";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import {
  CustomTable,
  DefaultBodyText,
  StrictField,
} from "../../components/Table/Customtable";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { CONFIG } from "../../shared/constants/common";
import { IOrderRow } from "../../shared/types/order";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
dayjs.extend(timezone);
dayjs.extend(utc);

export interface EggForm {
  formId: string;
  dateCreated: Date | string;
  timeCreated: Date | string;
  totalPrice: number;
  status: string;
}

export const EggOrderList = () => {
  const [myOrderList, setMyOrderList] = useState([]);
  const navigate = useNavigate();
  const fields: StrictField<IOrderRow>[] = [
    {
      header: "Người tạo",
      fieldKey: "username",
      width: 150,
    },
    {
      header: "Ngày lấy",
      fieldKey: "date",
      width: 350,
      render: ({ date }) => {
        const today = dayjs();
        const isTomorrow = dayjs(date).isSame(
          today.add(1, "day").format(CONFIG.MY_SQL_DATE_FORMAT)
        );
        const isToday = dayjs(date).isSame(
          today.format(CONFIG.MY_SQL_DATE_FORMAT)
        );

        return (
          <DefaultBodyText>
            {isTomorrow && "Ngày mai"}
            {isToday && "Hôm nay"}

            {!isToday && !isTomorrow && dayjs(date).format("DD/MM/YYYY")}
          </DefaultBodyText>
        );
      },
    },
    {
      header: "Giờ lấy",
      fieldKey: "time",
      width: 250,
    },
    {
      header: "Trạng thái",
      fieldKey: "status",
      width: 250,
      render: ({ status }) => <BoxByStatus status={status} />,
    },
    {
      header: "Ngày tạo",
      fieldKey: "createdAt",
      width: 250,
      render: ({ createdAt }) => {
        return (
          <DefaultBodyText>
            {dayjs(createdAt).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm")}
          </DefaultBodyText>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchMyListOrder() {
      const res = await getApi("order");

      if (res.success) setMyOrderList(res.data);
    }
    fetchMyListOrder();
  }, []);
  return (
    <Page title="Danh sách đơn trứng">
      <CustomTable
        fields={fields}
        data={myOrderList}
        onActionViewDetail={({ id }) =>
          navigate(`${SCREEN_PATHS.APPLICATION.DETAIL}:${id}`)
        }
      />
    </Page>
  );
};
