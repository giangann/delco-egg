import { Box, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { BoxTitle } from "../../styled/styled";
import { ClientDetailEggStatisticChart } from "./ClientDetailEggStatisticChart";
import { CustomMonthPicker } from "../../components/DateRange/CustomMonthPicker";
import {
  MonthTabs,
  OTHER_MONTH_TAB_INDEX,
} from "../../components/Tab/MonthTabs";
import dayjs, { Dayjs } from "dayjs";
import { CONFIG } from "../../shared/constants/common";

export type TPieChartData = {
  labels: string[];
  totalDatas: number[];
  qtyDatas: number[];
};
const defauttData = {
  labels: [],
  totalDatas: [],
  qtyDatas: [],
};

export const ClientDetailEggStatistic = () => {
  const [data, setData] = useState<TPieChartData>(defauttData);
  const params = useParams();

  const [dayMonth, setDayMonth] = useState<Dayjs | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const onMonthChange = (newValue: Dayjs) => {
    setDayMonth(newValue);
  };

  const onTabChange = (newValue: Dayjs | null, tabIndex?: number) => {
    if (tabIndex === OTHER_MONTH_TAB_INDEX) setShowMonthPicker(true);
    else setShowMonthPicker(false);

    setDayMonth(newValue);
  };
  // list egg by total and quantity
  useEffect(() => {
    async function fetchData() {
      const res = await getApi<TPieChartData>(
        `user/client-order-egg-statistic/${parseInt(params.id as string)}`,
        {
          start_date: dayMonth
            ? dayjs(dayMonth).startOf("month").format(CONFIG.MY_SQL_DATE_FORMAT)
            : "",
          end_date: dayMonth
            ? dayjs(dayMonth).endOf("month").format(CONFIG.MY_SQL_DATE_FORMAT)
            : "",
        }
      );
      if (res.success) {
        console.log(res.data);
        setData(res.data);
      }
    }
    fetchData();
  }, [dayMonth]);
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <BoxTitle>{"Các loại trứng đã mua"}</BoxTitle>
      </Stack>
      <Box ml={-1} mb={1}>
        <MonthTabs onChange={onTabChange} />
      </Box>

      <Box mb={2}>
        <CustomMonthPicker
          onChange={onMonthChange}
          date={dayMonth}
          isActive={showMonthPicker}
        />
      </Box>
      <ClientDetailEggStatisticChart data={data} />
    </Paper>
  );
};
