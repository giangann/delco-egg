import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import { CustomMonthPicker } from "../../../components/DateRange/CustomMonthPicker";
import {
  MonthTabs,
  OTHER_MONTH_TAB_INDEX,
} from "../../../components/Tab/MonthTabs";
import { useDevice } from "../../../hooks/useDevice";
import { getApi } from "../../../lib/utils/fetch/fetchRequest";
import { CONFIG } from "../../../shared/constants/common";
import { OrderStatusStatisticDoughnut } from "./OrderStatusStatisticDoughnut";

export const defaultDateRange = {
  startDate: dayjs(),
  endDate: dayjs(),
};
export const OrderStatusStatistic = () => {
  const [dayMonth, setDayMonth] = useState<Dayjs | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [dataSets, setDataSets] = useState<number[]>([]);
  const { isMobile } = useDevice();
  const onTabChange = (newValue: Dayjs | null, tabIndex?: number) => {
    if (tabIndex === OTHER_MONTH_TAB_INDEX) setShowMonthPicker(true);
    else setShowMonthPicker(false);

    setDayMonth(newValue);
  };
  const onMonthChange = (newValue: Dayjs) => {
    setDayMonth(newValue);
  };

  useEffect(() => {
    async function fetchStatistic() {
      const response = await getApi<number[]>("order/statistic/by-status", {
        start_date: dayMonth
          ? dayjs(dayMonth).startOf("month").format(CONFIG.MY_SQL_DATE_FORMAT)
          : "",
        end_date: dayMonth
          ? dayjs(dayMonth).endOf("month").format(CONFIG.MY_SQL_DATE_FORMAT)
          : "",
      });

      if (response.success) setDataSets(response.data);
    }
    fetchStatistic();
  }, [dayMonth]);

  return (
    <BoxStatisticWithTimeRange
      boxProps={{ sx: { backgroundColor: isMobile ? "" : "white" } }}
      title="Theo trạng thái đơn hàng"
      chooseTimeElement={<MonthTabs onChange={onTabChange} />}
    >
      <>
        <CustomMonthPicker
          onChange={onMonthChange}
          date={dayMonth}
          isActive={showMonthPicker}
        />

        {/* Doughnut bar with 5 fields of status */}
        <Box sx={{ my: 4 }}>
          <Grid container>
            {/* <Grid item xs={12} sm={6}> */}
              {/* <OrderStatusStatisticDoughnut data={dataSets} /> */}
            {/* </Grid> */}
            <Grid item xs={12} sm={12}>
              <OrderStatusStatisticDoughnut data={dataSets} />
            </Grid>
          </Grid>
        </Box>
      </>
    </BoxStatisticWithTimeRange>
  );
};
