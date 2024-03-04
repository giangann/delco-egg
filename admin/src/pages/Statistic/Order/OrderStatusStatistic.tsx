import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import {
  CustomDateRangePicker,
  IDateRange,
} from "../../../components/DateRange/CustomDateRangePicker";
import { getApi } from "../../../lib/utils/fetch/fetchRequest";
import { CONFIG } from "../../../shared/constants/common";
import { alignCenterSx } from "../../../styled/styled";
import { DateRangeTabs } from "./DateRangeTabs";
import { OrderStatusStatisticDoughnut } from "./OrderStatusStatisticDoughnut";

export const defaultDateRange = {
  startDate: dayjs(),
  endDate: dayjs(),
};
export const OrderStatusStatistic = () => {
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
        start_date: dayjs(dateRange.startDate).format(
          CONFIG.MY_SQL_DATE_FORMAT
        ),
        end_date: dayjs(dateRange.endDate).format(CONFIG.MY_SQL_DATE_FORMAT),
      });

      if (response.success) setDataSets(response.data);
    }
    fetchStatistic();
  }, [dateRange]);

  return (
    <BoxStatisticWithTimeRange
      title="Theo trạng thái đơn hàng"
      chooseTimeElement={<DateRangeTabs onChange={onChange} />}
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
