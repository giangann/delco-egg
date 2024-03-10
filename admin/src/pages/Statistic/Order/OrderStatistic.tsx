import { Grid, Paper } from "@mui/material";
import { Page } from "../../../components/Page/Page";
import { PageMobile } from "../../../components/Page/PageMobile";
import { useDevice } from "../../../hooks/useDevice";
import { OrderStatusStatistic } from "./OrderStatusStatistic";
import { OrderTotalStatistic } from "./OrderTotalStatistic";

export const OrderStatistic = () => {
  const { isMobile } = useDevice();
  return (
    <>
      {isMobile ? (
        <PageMobile title="Thống kê đơn hàng">
          <OrderStatusStatistic />
          <OrderTotalStatistic />
        </PageMobile>
      ) : (
        <Page title="Thống kê đơn hàng">
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Paper elevation={isMobile ? 0 : 4}>
                <OrderStatusStatistic />
              </Paper>
            </Grid>

            <Grid item sm={6}>
              <Paper elevation={isMobile ? 0 : 4}>
                <OrderTotalStatistic />
              </Paper>
            </Grid>
          </Grid>
        </Page>
      )}
    </>
  );
};
