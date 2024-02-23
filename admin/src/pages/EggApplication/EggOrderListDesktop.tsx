import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Page } from "../../components/Page/Page";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import {
    CustomTable,
    DefaultBodyText,
    StrictField,
} from "../../components/Table/Customtable";
import { toDayOrTomorrowOrYesterday } from "../../shared/helper";
import { IOrderRow } from "../../shared/types/order";
dayjs.extend(timezone);
dayjs.extend(utc);

type EggOrderListDesktopProps = {
  myOrderList: IOrderRow[];
  onViewDetail: (row: IOrderRow) => void;
};

export const EggOrderListDesktop = ({
  onViewDetail,
  myOrderList,
}: EggOrderListDesktopProps) => {
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
      render: ({ status }) => <BoxByStatus margin={"0 auto"} status={status} />,
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
