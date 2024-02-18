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
import { IOrderRow } from "../../shared/types/order";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { toDayOrTomorrowOrYesterday } from "../../shared/helper";
dayjs.extend(timezone);
dayjs.extend(utc);

export const EggOrderList = () => {
  const [myOrderList, setMyOrderList] = useState<IOrderRow[]>([]);
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
        return (
          <DefaultBodyText>
            {toDayOrTomorrowOrYesterday(date) ||
              dayjs(date).format("DD/MM/YYYY")}
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

  const onViewDetail = ({ id }: IOrderRow) => {
    let path = SCREEN_PATHS.APPLICATION.DETAIL;
    let arrPathBySlash = path.split("/");
    arrPathBySlash.pop();

    let newPathWithoutSlug = arrPathBySlash.join("/");
    navigate(`${newPathWithoutSlug}/${id}`);
  };

  useEffect(() => {
    async function fetchMyListOrder() {
      const res = await getApi<IOrderRow[]>("order");

      if (res.success) setMyOrderList(res.data);
    }
    fetchMyListOrder();
  }, []);
  return (
    <Page title="Danh sách đơn trứng">
      <CustomTable
        fields={fields}
        data={myOrderList}
        onActionViewDetail={onViewDetail}
      />
    </Page>
  );
};
