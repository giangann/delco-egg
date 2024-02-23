import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { Page } from "../../components/Page/Page";
import { Item, items } from "../Home/Home";
import { LinkCustom } from "../../styled/styled";
import { GREEN } from "../../styled/color";
import { useDevice } from "../../hooks/useDevice";
import { IcBaselineAddCircleOutline } from "../../shared/icons/Icon";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { SLUG } from "../../shared/constants/slug";

export const Statistic = () => {
  const { isMobile } = useDevice();

  return (
    <Page title="Thống kê">
      <Grid container spacing={{ xs: 1.5, sm: 2 }} mb={2}>
        {statisticItems.map((item: Item, index: number) => (
          <Grid item xs={6} sm={3} key={index}>
            <LinkCustom to={item.path}>
              <Paper
                elevation={4}
                sx={{
                  backgroundColor: GREEN["500"],
                  py: { xs: 2, sm: 4 },
                  px: 1.5,
                  color: "whitesmoke",
                  minHeight: isMobile ? 90 : "none",
                }}
              >
                <Stack spacing={1} alignItems={"center"}>
                  <TypeText>{item.text}</TypeText>
                  <IcBaselineAddCircleOutline fontSize={isMobile ? 20 : 24} />
                </Stack>
              </Paper>
            </LinkCustom>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

const TypeText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
const statisticItems: Item[] = [
  {
    path: SCREEN_PATHS.STATISTIC.REVENUE,
    text: "Thống kê doanh thu",
  },
  {
    path: SCREEN_PATHS.STATISTIC.APPLICATION,
    text: "Thống kê đơn hàng",
  },
  {
    path: SCREEN_PATHS.STATISTIC.EGG,
    text: "Thống kê trứng",
  },
  {
    path: SCREEN_PATHS.STATISTIC.USER,
    text: "Thống kê người dùng",
  },
];
