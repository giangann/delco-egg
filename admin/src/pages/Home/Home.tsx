import { Box, Stack, Typography, styled } from "@mui/material";
import { BoxStatistic } from "../../components/Box/BoxStatistic";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import {
  IcBaselineArrowDropUp,
  IcOutlineNavigateNext,
} from "../../shared/icons/Icon";
import {
  RowStatisticStyled,
  StackAlignCenterJustifySpaceBetween,
  alignCenterSx,
} from "../../styled/styled";
import { BoxAnnotate } from "../../components/Box/BoxAnnotate";
import { SLUG } from "../../shared/constants/slug";
import { TodayOverview } from "./TodayOverview";

export const Home = () => {
  return (
    <>
      <Box height={200} width="100%" sx={{ backgroundColor: "white", mb: 1.5 }}>
        <Box sx={{ padding: 0 }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: 20, py: 1, paddingLeft: 1.5 }}
          >
            Xin chào, <span style={{ fontWeight: 600 }}>Admin Lê Hường !</span>
          </Typography>

          {/* tổng quan: doanh thu + số trứng xuất + trung bình doanh thu/quả */}
          <TodayOverview/>

          {/* giá các mix */}
          <BoxStatistic
            rightElementInTitleRow={
              <Box sx={{ ...alignCenterSx }}>
                <Typography
                  style={{ marginLeft: 8, fontWeight: 500, color: "green" }}
                >
                  35đ
                </Typography>
                <IcBaselineArrowDropUp color="green" style={{ fontSize: 25 }} />
              </Box>
            }
            title="Giá trứng hôm nay"
          >
            <Box marginTop={1.25}>
              <Stack direction={"row"} spacing={3} ml={7}>
                <BoxAnnotate color="black" fieldName="Delco" />
                <BoxAnnotate color="purple" fieldName="Thị trường" />
                <BoxAnnotate color="blue" fieldName="CP" />
              </Stack>
              {[1, 2, 3, 4].map((item) => (
                <RowStatisticStyled>
                  <StackAlignCenterJustifySpaceBetween>
                    <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                      Mix {item}
                      {":"}
                      <span style={{ marginLeft: 12, fontWeight: 650 }}>
                        2300 đ
                      </span>
                      <span
                        style={{
                          marginLeft: 12,
                          fontWeight: 650,
                          color: "purple",
                        }}
                      >
                        2300 đ
                      </span>
                      <span
                        style={{
                          marginLeft: 12,
                          fontWeight: 650,
                          color: "blue",
                        }}
                      >
                        2300 đ
                      </span>
                    </Typography>
                    <IcOutlineNavigateNext />
                  </StackAlignCenterJustifySpaceBetween>
                </RowStatisticStyled>
              ))}
            </Box>
          </BoxStatistic>
        </Box>
      </Box>
    </>
  );
};

const TitleText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 24,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

// const UnitText = styled(Typography)(({ theme }) => ({
//   color: "green",
//   fontSize: 16,
//   fontWeight: 500,
//   textAlign: "center",
//   [theme.breakpoints.up("sm")]: {},
// }));

const TypeText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

// const PriceText = styled(Typography)(({ theme }) => ({
//   fontSize: 20,
//   fontWeight: 800,
//   textAlign: "center",
//   [theme.breakpoints.up("sm")]: {},
// }));
export type Item = {
  path: string;
  text: string;
  children?: Item[];
};
export const items: Item[] = [
  {
    path: SCREEN_PATHS.APPLICATION.LIST,
    text: "Quản lý đơn hàng",
  },
  {
    path: `${SLUG.MANAGE}/${SLUG.EGG}`,
    text: "Quản lý trứng",
    children: [
      {
        path: SCREEN_PATHS.EGG.UPDATE_PRICE,
        text: "Cập nhật giá trứng",
      },
      {
        path: SCREEN_PATHS.EGG.UPDATE_QUANTITY,
        text: "Cập nhật số lượng trứng",
      },
      {
        path: SCREEN_PATHS.EGG.LIST_TYPE,
        text: "Danh sách loại trứng",
      },
      {
        path: SCREEN_PATHS.EGG.CREATE_TYPE,
        text: "Tạo mới loại trứng",
      },
    ],
  },

  {
    path: SCREEN_PATHS.USER.LIST,
    text: "Quản lý người dùng",
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

