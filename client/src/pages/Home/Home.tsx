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

export const Home = () => {
  return (
    <Container>
      <p>Home</p>

      <Paper elevation={1} sx={{ padding: 2 }}>
        <TitleText>Giá trứng hôm nay</TitleText>
        <UnitText>{"(vnđ/quả)"}</UnitText>

        <Grid container spacing={1}>
          {eggPrices.map((type) => (
            <Grid item xs={4}>
              <PriceBox type={type.type} price={type.price} />
            </Grid>
          ))}
        </Grid>
      </Paper>
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

const PriceBox = ({ type, price }: { type: string; price: number }) => {
  return (
    <Box sx={{ backgroundColor: "whitesmoke" }}>
      <TypeText>{type}</TypeText>
      <PriceText>{price}</PriceText>
    </Box>
  );
};

const TitleText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 24,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

const UnitText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 16,
  fontWeight: 500,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

const TypeText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 800,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
type Item = {
  path: string;
  text: string;
};
const items: Item[] = [
  {
    path: SCREEN_PATHS.CREATE,
    text: "Tạo đơn đặt trứng",
  },
  {
    path: SCREEN_PATHS.LIST,
    text: "Lịch sử  đặt trúng",
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

const eggPrices = [
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
