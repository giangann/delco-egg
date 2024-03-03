import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import {
  CustomDateRangePicker,
  IDateRange,
} from "../../../components/DateRange/CustomDateRangePicker";
import { getApi } from "../../../lib/utils/fetch/fetchRequest";
import { IcOutlineNavigateNext } from "../../../shared/icons/Icon";
import { IOrderRow } from "../../../shared/types/order";
import {
  RowStatisticStyled,
  StackAlignCenterJustifySpaceBetween,
} from "../../../styled/styled";
import { defaultDateRange } from "./OrderStatusStatistic";
import { TimeRangeTabs } from "./TimeRangeTabs";
import { numberWithComma } from "../../../shared/helper";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../../shared/constants/screenPaths";

interface IOrderStatistic extends IOrderRow {
  total: number;
}
export const OrderTotalStatistic = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(defaultDateRange);
  const [orderList, setOrderList] = useState<IOrderStatistic[]>([]);

  const [isChooseDateRangeActive, setIsChooseDateRangeActive] = useState(false);
  const onChange = (newValue: IDateRange) => {
    if (newValue.endDate && newValue.startDate) {
      setIsChooseDateRangeActive(false);
      setDateRange(newValue);
    } else {
      setDateRange(defaultDateRange);
      setIsChooseDateRangeActive(true);
    }
  };

  const onDateRangeChange = (newValue: IDateRange) => {
    setDateRange(newValue);
  };
  useEffect(() => {
    async function fetchOrderList() {
      const response = await getApi<IOrderStatistic[]>(
        "order/statistic/by-total",
        {
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
        }
      );
      if (response.success) setOrderList(response.data);
    }
    fetchOrderList();
  }, [dateRange]);
  return (
    <BoxStatisticWithTimeRange
      title="Theo giá trị đơn hàng"
      chooseTimeElement={<TimeRangeTabs onChange={onChange} />}
    >
      <>
        <CustomDateRangePicker
          onChange={onDateRangeChange}
          dateRange={dateRange}
          isActive={isChooseDateRangeActive}
        />
        <Box my={4}>
          {!orderList.length ? (
            <Typography fontSize={18} textAlign={"center"} color={"red"}>
              {"Không có đơn hàng trong khoảng thời gian"}
            </Typography>
          ) : (
            orderList.map((order) => <Order order={order} />)
          )}
        </Box>
      </>
    </BoxStatisticWithTimeRange>
  );
};

const Order = ({ order }: { order: IOrderStatistic }) => {
  const navigate = useNavigate();
  const onViewDetail = (id: number | string) => {
    let path = SCREEN_PATHS.APPLICATION.DETAIL;
    let arrPathBySlash = path.split("/");
    arrPathBySlash.pop();

    let newPathWithoutSlug = arrPathBySlash.join("/");
    navigate(`${newPathWithoutSlug}/${id}`);
  };
  return (
    <RowStatisticStyled
      sx={{ mt: 1.25, pb: 1.25 }}
      component={"div"}
      onClick={() => onViewDetail(order.id)}
    >
      <StackAlignCenterJustifySpaceBetween>
        <Box>
          <StackAlignCenterJustifySpaceBetween>
            <Typography sx={{ fontWeight: 400, fontSize: 18 }}>
              Order #{order.id}
            </Typography>
            <Typography sx={{ ml: 4, fontWeight: 500, fontSize: 18 }}>
              Giá trị{": "}
              <span style={{ fontWeight: 650 }}>
                {numberWithComma(order.total)} đ
              </span>
            </Typography>
          </StackAlignCenterJustifySpaceBetween>
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            {"User: "}
            <span style={{ fontWeight: 650 }}>{order.fullname}</span>
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            {"Công ty: "}
            <span style={{ fontWeight: 650 }}>{order.company_name}</span>
          </Typography>
        </Box>
        <IcOutlineNavigateNext />
      </StackAlignCenterJustifySpaceBetween>
    </RowStatisticStyled>
  );
};
