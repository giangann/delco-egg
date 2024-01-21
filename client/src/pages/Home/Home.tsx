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
import { GREEN } from "../../styled/color";
import { LinkCustom, PageTitleText } from "../../styled/styled";
import { IcBaselineAddCircleOutline } from "../../shared/icons/Icon";
import { useDevice } from "../../hooks/useDevice";
import { useEffect } from "react";
import { getApi } from "../../lib/utils/fetch/fetchRequest";

export const Home = () => {
  const { isMobile } = useDevice();

  useEffect(() => {
    async function fetchListUser() {
      const res = await getApi("user/");
      console.log(res);
    }
    fetchListUser();
  });
  return (
    <Container>
      <Paper elevation={4} sx={{ padding: 2, mt: 3 }}>
        <PageTitleText>Giá trứng hôm nay</PageTitleText>
        {/* <UnitText>{"(vnđ/quả)"}</UnitText> */}

        <Grid mt={0} container columnSpacing={1} rowSpacing={3}>
          {eggPrices.map((type) => (
            <Grid item xs={4}>
              <PriceBox type={type.type} price={type.price} />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper elevation={0} sx={{ padding: 2, mt: 4 }}>
        <Box>
          <PageTitleText mb={2}>Thao tác</PageTitleText>
          <Grid container spacing={3}>
            {items.map((item: Item, index: number) => (
              <Grid item xs={6} key={index}>
                <LinkCustom to={item.path}>
                  <Paper
                    elevation={4}
                    sx={{
                      backgroundColor: GREEN["500"],
                      py: 2,
                      px: 1.5,
                      color: "whitesmoke",
                      minHeight: isMobile ? 90 : "none",
                    }}
                  >
                    <Stack spacing={1} alignItems={"center"}>
                      <TypeText>{item.text}</TypeText>
                      <IcBaselineAddCircleOutline
                        fontSize={isMobile ? 20 : 24}
                      />
                    </Stack>
                  </Paper>{" "}
                </LinkCustom>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

const PriceBox = ({ type, price }: { type: string; price: number }) => {
  return (
    <Box sx={{ backgroundColor: "whitesmoke", py: 1.5 }}>
      <Stack spacing={1.25}>
        <LineBlockInPriceBox>
          <TypeText>{type}</TypeText>
        </LineBlockInPriceBox>
        <LineBlockInPriceBox>
          <InfoTextKey>{"Khối lượng"}</InfoTextKey>
          <InfoTextValue>{"10 quả 500g"}</InfoTextValue>
        </LineBlockInPriceBox>
        <LineBlockInPriceBox>
          <InfoTextKey>{"Giá 1 quả"}</InfoTextKey>
          <PriceText>{price} đ</PriceText>
        </LineBlockInPriceBox>
      </Stack>
    </Box>
  );
};

const LineBlockInPriceBox = styled(Box)({});

// const UnitText = styled(Typography)(({ theme }) => ({
//   color: GREEN["500"],
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

const InfoTextKey = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
const InfoTextValue = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
type Item = {
  path: string;
  text: string;
};
export const items: Item[] = [
  {
    path: SCREEN_PATHS.CREATE,
    text: "Tạo đơn đặt trứng",
  },
  {
    path: SCREEN_PATHS.LIST,
    text: "Lịch sử đặt trứng",
  },
  {
    path: SCREEN_PATHS.ABOUT,
    text: "Về chúng tôi",
  },
  {
    path: SCREEN_PATHS.CONTACT,
    text: "Liên hệ",
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
