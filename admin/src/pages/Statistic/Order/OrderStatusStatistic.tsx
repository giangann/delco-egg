import { useEffect, useState } from "react";
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
import { getApi } from "../../../lib/utils/fetch/fetchRequest";

export const OrderStatusStatistic = () => {
  const defaultDateRange = {
    startDate: commonDateWithMySqlFormat().today,
    endDate: commonDateWithMySqlFormat().today,
  };
  const [dateRange, setDateRange] = useState<IDateRange>(defaultDateRange);
  const [dataSets, setDataSets] = useState<number[]>([]);
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
    async function fetchStatistic() {
      const response = await getApi<number[]>("order/statistic/by-status", {
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
      });

      if (response.success) setDataSets(response.data);
    }
    fetchStatistic()
  }, [dateRange]);

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
          <OrderStatusStatisticDoughnut data={dataSets} />
        </Box>
      </>
    </BoxStatisticWithTimeRange>
  );
};
