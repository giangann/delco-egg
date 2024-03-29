import { Box, Grid, Paper, Stack, styled } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MonthTabs, OTHER_MONTH_TAB_INDEX } from "../../components/Tab/MonthTabs";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { CONFIG } from "../../shared/constants/common";
import { numberWithComma, sumOfObject } from "../../shared/helper";
import { BoxFieldName, BoxFieldValue, BoxTitle } from "../../styled/styled";
import { CustomMonthPicker } from "../../components/DateRange/CustomMonthPicker";

type TOrderOverview = {
  status: {
    success: number;
    waiting_approval: number;
    accepted: number;
    rejected: number;
    cancel: number;
  };
  total: number;
  quantity: number;
};

const orderOverviewDefault = {
  status: {
    success: 0,
    waiting_approval: 0,
    accepted: 0,
    rejected: 0,
    cancel: 0,
  },
  total: 0,
  quantity: 0,
};

export const ClientDetailOrderOverview = () => {
  const [orderOverview, setOrderOverview] =
    useState<TOrderOverview>(orderOverviewDefault);
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
  const params = useParams();
  useEffect(() => {
    async function fetchOrderOverview() {
      const response = await getApi<TOrderOverview>(
        `user/client-order-overview/${params.id}`,
        {
          start_date: dayMonth
            ? dayjs(dayMonth).startOf("month").format(CONFIG.MY_SQL_DATE_FORMAT)
            : "",
          end_date: dayMonth
            ? dayjs(dayMonth).endOf("month").format(CONFIG.MY_SQL_DATE_FORMAT)
            : "",
        }
      );
      if (response.success) setOrderOverview(response.data);
    }
    fetchOrderOverview();
  }, [dayMonth]);
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <BoxTitle>{"Thống kê đơn hàng"}</BoxTitle>
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

      <Grid container>
        <Grid item xs={12} sm={3}>
          <BoxContent>
            <BoxFieldName>{"Tổng giá trị đã mua"}</BoxFieldName>
            <BoxFieldValue>{`${numberWithComma(
              orderOverview.total
            )} đ`}</BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={12} sm={3}>
          <BoxContent>
            <BoxFieldName>{"Tổng số trứng đã mua"}</BoxFieldName>
            <BoxFieldValue>{`${numberWithComma(
              orderOverview.quantity
            )} quả`}</BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>Số đơn đã đặt</BoxFieldName>
            <BoxFieldValue>{sumOfObject(orderOverview.status)}</BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>Thành công</BoxFieldName>
            <BoxFieldValue>{orderOverview.status.success}</BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>Chấp nhận</BoxFieldName>
            <BoxFieldValue>{orderOverview.status.accepted}</BoxFieldValue>
          </BoxContent>
        </Grid>{" "}
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>Chờ phê duyệt</BoxFieldName>
            <BoxFieldValue>
              {orderOverview.status.waiting_approval}
            </BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>Bị từ chối</BoxFieldName>
            <BoxFieldValue>{orderOverview.status.rejected}</BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>Đã hủy</BoxFieldName>
            <BoxFieldValue>{orderOverview.status.cancel}</BoxFieldValue>
          </BoxContent>
        </Grid>
      </Grid>
    </Paper>
  );
};

const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));
