import { Stack } from "@mui/material";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useContext } from "react";
import { ReactExportCsv } from "../../components/Excel/ReactExportCsv";
import { Page } from "../../components/Page/Page";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import { CustomPagiProps } from "../../components/Table/CustomPagi";
import {
  CustomTable,
  DefaultBodyText,
  StrictField,
} from "../../components/Table/Customtable";
import { OrderListContext } from "../../contexts/OrderListContext";
import { toDayOrTomorrowOrYesterday } from "../../shared/helper";
import { IOrderRow } from "../../shared/types/order";
import { FilterList } from "./FilterList";
import { FilterOrder } from "./FilterOrder";
dayjs.extend(timezone);
dayjs.extend(utc);

export const EggOrderListDesktop = () => {
  const { params, pagination, setParams, orderList, onViewDetail } =
    useContext(OrderListContext);

  const { limit } = params;
  const { currentPage, nextPage, previousPage, totalPages } = pagination;

  const pagiProps: CustomPagiProps = {
    currPage: currentPage,
    totalPage: totalPages,
    onGoToEnd: () => {
      setParams("page", totalPages);
    },
    onGoToStart: () => {
      setParams("page", 1);
    },
    onNextPage: () => {
      setParams("page", nextPage);
    },
    onPerPageChange: (newLimit: number) => {
      setParams("limit", newLimit);
      setParams("page", 1);
    },
    onPrevPage: () => {
      setParams("page", previousPage);
    },
    perpage: limit as number,
  };
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
      <Stack direction={"row"} justifyContent={"space-between"} my={1}>
        <Stack direction={"row"}>
          <FilterList />
          <FilterOrder/>
        </Stack>
        <ReactExportCsv
          fileName="danh-sach-don-hang"
          data={toCsv(orderList, fields)}
        />
      </Stack>
      <CustomTable
        fields={fields}
        data={orderList}
        onActionViewDetail={onViewDetail}
        pagiProps={pagiProps}
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
