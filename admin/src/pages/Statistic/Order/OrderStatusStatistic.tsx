import { useState } from "react";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import {
  CustomDateRangePicker,
  IDateRange,
} from "../../../components/DateRange/CustomDateRangePicker";
import { TimeRangeTabs } from "./TimeRangeTabs";
import { commonDateWithMySqlFormat } from "../../../shared/helper";
import { Box, Typography } from "@mui/material";
import { alignCenterSx } from "../../../styled/styled";
import { OrderStatusStatisticDoughnut } from "./OrderStatusStatisticDoughnut";

export const OrderStatusStatistic = () => {
  const defaultDateRange = {
    startDate: commonDateWithMySqlFormat().today,
    endDate: commonDateWithMySqlFormat().today,
  };
  const [dateRange, setDateRange] = useState<IDateRange>(defaultDateRange);

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

  return (
    <BoxStatisticWithTimeRange
      title="Thống kê trạng thái đơn hàng"
      chooseTimeElement={<TimeRangeTabs onChange={onChange} />}
    >
      <>
        <CustomDateRangePicker
          onChange={onDateRangeChange}
          dateRange={dateRange}
          isActive={isChooseDateRangeActive}
        />

      {/* Doughnut bar with 5 fields of status */}
        <Box sx={{ ...alignCenterSx, my: 4 }}>
          <OrderStatusStatisticDoughnut data={[]}/>
        </Box>
      </>
    </BoxStatisticWithTimeRange>
  );
};
