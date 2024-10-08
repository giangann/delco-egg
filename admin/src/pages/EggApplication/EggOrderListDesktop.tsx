import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useContext } from "react";
import { Page } from "../../components/Page/Page";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import { CustomPagiProps } from "../../components/Table/CustomPagi";
import {
  CustomTable,
  DefaultBodyText,
  StrictField,
} from "../../components/Table/Customtable";
import { OrderListContext } from "../../contexts/OrderListContext";
import {
  numberWithComma,
  toDayOrTomorrowOrYesterday,
} from "../../shared/helper";
import { IOrderRow } from "../../shared/types/order";
import { FilterList } from "./FilterList";
import { FilterOrder } from "./FilterOrder";
import { OrderListToCSV } from "./OrderListToCSV";
dayjs.extend(timezone);
dayjs.extend(utc);

export const EggOrderListDesktop = () => {
  const { params, pagination, setParams, orderList, onViewDetail } =
    useContext(OrderListContext);

  const { limit } = params;
  const { currentPage, nextPage, previousPage, totalPages, totalItems } =
    pagination;

  const pagiProps: CustomPagiProps = {
    totalItems: totalItems,
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
      header: "Tổng tiền",
      fieldKey: "total",
      width: 250,
      render: ({ total }) => {
        return (
          <Typography
            fontSize={18}
            textAlign={"center"}
            fontWeight={500}
            color="blue"
          >
            {numberWithComma(total)} đ
          </Typography>
        );
      },
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
          <FilterOrder />
        </Stack>
        {/* <ReactExportCsv
          fileName="danh-sach-don-hang"
          data={toCsv(orderList, fields)}
        /> */}
        <OrderListToCSV />
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
