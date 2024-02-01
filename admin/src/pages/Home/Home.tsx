import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    async function fetchListUser() {
      const res = await getApi("user/", { isAdmin: "0" });
      console.log(res);
    }
    fetchListUser();
  });
  return (
    <Container>
      <Paper elevation={1} sx={{ padding: 2, mt: 8 }}>
        <Box>
          <TitleText>Thao tác</TitleText>
          <Grid container spacing={3}>
            {items.map((item: Item, index: number) => (
              <Grid item xs={6} key={index}>
                <Stack
                  spacing={1}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <TypeText>{item.text}</TypeText>
                  <a href={item.path}>
                    <Typography sx={{ textAlign: "center" }} variant="caption">
                      {">>>"}go
                    </Typography>
                  </a>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
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
    path: "#",
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
