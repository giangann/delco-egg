import { Grid, Paper } from "@mui/material";
import { Page } from "../../../components/Page/Page";
import { PageMobile } from "../../../components/Page/PageMobile";
import { useDevice } from "../../../hooks/useDevice";
import { EggPriceHistoryStatistic } from "./EggPriceHistoryStatistic";

export const EggStatistic = () => {
  const { isMobile } = useDevice();
  return (
    <>
      {isMobile ? (
        <PageMobile title="Thống kê trứng">
          <EggPriceHistoryStatistic />
        </PageMobile>
      ) : (
        <Page title="Thống kê trứng">
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Paper elevation={isMobile ? 0 : 4}>
                <EggPriceHistoryStatistic />
              </Paper>
            </Grid>
          </Grid>
        </Page>
      )}
    </>
  );
};
