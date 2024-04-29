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
import { useContext } from "react";
import { OrderListContext } from "../../contexts/OrderListContext";
import { ReactExportCsv } from "../../components/Excel/ReactExportCsv";
dayjs.extend(timezone);
dayjs.extend(utc);

export const EggOrderListDesktop = () => {
  const { orderList, onViewDetail } = useContext(OrderListContext);
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
      <ReactExportCsv
        fileName="danh-sach-don-hang"
        data={toCsv(orderList, fields)}
      />
      <CustomTable
        fields={fields}
        data={orderList}
        onActionViewDetail={onViewDetail}
      />
    </Page>
  );
};

// need a function transform from object key to real name for table in excet
//  vd: user_name => Ten nguoi dung

function toCsv(data: IOrderRow[], fields: StrictField<IOrderRow>[]) {
  const dataJson = JSON.stringify(data);
  const newData: IOrderRow[] = JSON.parse(dataJson);
  return newData.map((row) => {
    // get keys of this object
    let keys = Object.keys(row);

    for (let key of keys) {
      // find the header correspond with this key
      let newKey = fields.filter((field) => field.fieldKey === key)[0]?.header;
      row[newKey] = row[key];
      delete row[key];
    }

    return row;
  });
}
