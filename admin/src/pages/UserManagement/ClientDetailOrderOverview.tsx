import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { numberWithComma, sumOfObject } from "../../shared/helper";
import { defaultDateRange } from "../Statistic/Order/OrderStatusStatistic";
import dayjs from "dayjs";
import { CONFIG } from "../../shared/constants/common";
import { MonthTabs } from "../../components/Tab/MonthTabs";

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
  const [dateRange, setDateRange] = useState({
    start_date: null,
    end_date: null,
  });
  const onDateRangeChange = (newValue: any) => {
    setDateRange(newValue);
  };
  const params = useParams();
  useEffect(() => {
    async function fetchOrderOverview() {
      const response = await getApi<TOrderOverview>(
        `user/client-order-overview/${params.id}`,
        {
          start_date: dateRange.start_date
            ? dayjs(dateRange.start_date).format(CONFIG.MY_SQL_DATE_FORMAT)
            : "",
          end_date: dateRange.end_date
            ? dayjs(dateRange.end_date).format(CONFIG.MY_SQL_DATE_FORMAT)
            : "",
        }
      );
      if (response.success) setOrderOverview(response.data);
    }
    fetchOrderOverview();
  }, [dateRange]);
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <BoxTitle>{"Thống kê đơn hàng"}</BoxTitle>
      </Stack>
      <Grid container>
        <Grid item xs={12}>
          <MonthTabs onChange={onDateRangeChange} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <BoxContent>
            <BoxFieldName>{"Tổng giá trị đã mua"}</BoxFieldName>
            <BoxFieldValue>{`${numberWithComma(
              orderOverview.total
            )} đ`}</BoxFieldValue>
          </BoxContent>
        </Grid>
        <Grid item xs={6} sm={3}>
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
            <BoxFieldName>Đang chờ phê duyệt</BoxFieldName>
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

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {},
}));
const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldName = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  opacity: 0.9,

  [theme.breakpoints.up("sm")]: {},
}));
