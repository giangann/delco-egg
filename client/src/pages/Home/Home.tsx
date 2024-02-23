import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  styled
} from "@mui/material";
import { useEffect, useState } from "react";
import { Page } from "../../components/Page/Page";
import { useDevice } from "../../hooks/useDevice";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { IcBaselineAddCircleOutline } from "../../shared/icons/Icon";
import { IEggPriceQty } from "../../shared/types/egg";
import { GREEN } from "../../styled/color";
import { LinkCustom } from "../../styled/styled";
import { WaitingUpdatePrice } from "./WaitingUpdatePrice";

export const Home = () => {
  const { isMobile } = useDevice();
  const [listEgg, setListEgg] = useState<IEggPriceQty[]>([]);

  useEffect(() => {
    async function fetchListEgg() {
      const res = await getApi("egg-price-qty");
      if (res.success) setListEgg(res.data);
    }
    fetchListEgg();
  }, []);
  return (
    <>
      <Page title="Giá trứng hôm nay">
        {/* <PageTitleText>Giá trứng hôm nay</PageTitleText> */}
        {/* <UnitText>{"(vnđ/quả)"}</UnitText> */}

        {listEgg.length ? (
          <Grid mt={0} container columnSpacing={1} rowGap={{ xs: 1.5, sm: 3 }}>
            {listEgg.map((egg) => (
              <Grid item xs={4}>
                <PriceBox {...egg} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <WaitingUpdatePrice />
        )}
      </Page>
      <Page title="Thao tác">
        <Grid container spacing={{ xs: 1.5, sm: 2 }} mb={2}>
          {items.map((item: Item, index: number) => (
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
    </>
  );
};

const PriceBox = ({ egg: { weight, type_name }, price_1 }: IEggPriceQty) => {
  return (
    <Box sx={{ backgroundColor: "whitesmoke", py: 1.5 }}>
      <Stack spacing={1.25}>
        <LineBlockInPriceBox>
          <TypeText>{type_name}</TypeText>
        </LineBlockInPriceBox>
        <LineBlockInPriceBox>
          <InfoTextKey>{"Khối lượng"}</InfoTextKey>
          <InfoTextValue>{weight}</InfoTextValue>
        </LineBlockInPriceBox>
        <LineBlockInPriceBox>
          <InfoTextKey>{"Giá 1 quả"}</InfoTextKey>
          <PriceText>{price_1} đ</PriceText>
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
  fontSize: 20,
  fontWeight: 700,

  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: 22,
  },
}));

const InfoTextKey = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));
const InfoTextValue = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: 22,
  fontWeight: 700,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: 24,
  },
}));
export type Item = {
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
