import { Box, Grid, Typography, styled } from "@mui/material";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { SLUG } from "../../shared/constants/slug";
import { EggPricesBlock } from "./EggPricesBlock";
import { TodayOverview } from "./TodayOverview";
import { useDevice } from "../../hooks/useDevice";
import { Page } from "../../components/Page/Page";
import useAuth from "../../hooks/useAuth";

export const Home = () => {
  const { isMobile } = useDevice();
  return (
    <>
      <Box height={200} width="100%" sx={{ backgroundColor: "white", mb: 1.5 }}>
        <Box sx={{ padding: 0 }}>
         {isMobile && <Hello/>}

          {isMobile ? (
            <>
              {/* tổng quan: doanh thu + số trứng xuất + trung bình doanh thu/quả */}
              <TodayOverview />

              {/* giá các mix */}
              <EggPricesBlock />
            </>
          ) : (
            <Page title="Tổng quan">
              <Grid container spacing={4}>
                <Grid item sm={6}>
                  {/* tổng quan: doanh thu + số trứng xuất + trung bình doanh thu/quả */}
                  <TodayOverview />
                </Grid>

                <Grid item sm={6}>
                  {/* giá các mix */}
                  <EggPricesBlock />
                </Grid>
              </Grid>
            </Page>
          )}
        </Box>
      </Box>
    </>
  );
};

const Hello = () => {
  const { user } = useAuth();
  return (
    <Typography sx={{ fontWeight: 500, fontSize: 20, py: 1, paddingLeft: 1.5 }}>
      Xin chào, <span style={{ fontWeight: 600 }}>{user?.fullname}</span>
    </Typography>
  );
};

export type Item = {
  path: string;
  text: string;
  children?: Item[];
};
export const items: Item[] = [
  {
    path: `${SLUG.MANAGE}`,
    text: "Quản lý",
    children: [
      {
        path: SCREEN_PATHS.MANAGE.APPLICATION.LIST,
        text: "Quản lý đơn hàng",
      },
      {
        path: SCREEN_PATHS.MANAGE.EGG.INDEX,
        text: "Quản lý trứng",
        children: [
          {
            path: SCREEN_PATHS.MANAGE.EGG.UPDATE_PRICE,
            text: "Cập nhật giá trứng",
          },
          {
            path: SCREEN_PATHS.MANAGE.EGG.UPDATE_QUANTITY,
            text: "Cập nhật số lượng trứng",
          },
          {
            path: SCREEN_PATHS.MANAGE.EGG.LIST,
            text: "Danh sách loại trứng",
          },
          {
            path: SCREEN_PATHS.MANAGE.EGG.CREATE,
            text: "Tạo mới loại trứng",
          },
        ],
      },
      {
        path: SCREEN_PATHS.MANAGE.USER.LIST,
        text: "Quản lý người dùng",
      },
    ],
  },

  {
    path: `${SLUG.STATISTIC}`,
    text: "Thống kê",
    children: [
      // {
      //   path: SCREEN_PATHS.STATISTIC.REVENUE,
      //   text: "Thống kê doanh thu",
      // },
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
    ],
  },
];

export const eggPrices = [
  {
    type: "Mix 1",
    price: 3000,
  },
  {
    type: "Mix 2",
    price: 2900,
  },
  {
    type: "Mix 3",
    price: 2150,
  },
  {
    type: "Mix 4",
    price: 2300,
  },
  {
    type: "Mix 5",
    price: 2400,
  },
  {
    type: "Mix 6",
    price: 2600,
  },
];
