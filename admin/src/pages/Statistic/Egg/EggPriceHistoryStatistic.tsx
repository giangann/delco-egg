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
import { DateRangeTabs } from "../Order/DateRangeTabs";
import { defaultDateRange } from "../Order/OrderStatusStatistic";
import { EggPriceHistoryChart, TChart } from "./EggPriceHistoryChart";

const defaultData: TChart = {
  labels: [],
  datasets: [{ data: [], label: "" }],
};
export const EggPriceHistoryStatistic = () => {
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

  const [chartData, setChartData] = useState<TChart>(defaultData);
  useEffect(() => {
    async function fetchEggPriceQtyHistory() {
      const response = await getApi<TChart>("statistic/egg-price-qty-history", {
        start_date: dayjs(dateRange.startDate).format(
          CONFIG.MY_SQL_DATE_FORMAT
        ),
        end_date: dayjs(dateRange.endDate).format(CONFIG.MY_SQL_DATE_FORMAT),
      });
      if (response.success) {
        console.log(response.data);
        setChartData(response.data);
      }
    }
    fetchEggPriceQtyHistory();
  }, [dateRange]);

  return (
    <BoxStatisticWithTimeRange
      boxProps={{ sx: { backgroundColor: "white" } }}
      title="Giá trứng"
      chooseTimeElement={<DateRangeTabs onChange={onChange} />}
    >
      <>
        <CustomDateRangePicker
          onChange={onDateRangeChange}
          dateRange={dateRange}
          isActive={isChooseDateRangeActive}
        />

        {/* Doughnut bar with 5 fields of status */}
        <Box sx={{ mb: 4 }}>
          <EggPriceHistoryChart chartData={chartData} />
        </Box>
      </>
    </BoxStatisticWithTimeRange>
  );
};
