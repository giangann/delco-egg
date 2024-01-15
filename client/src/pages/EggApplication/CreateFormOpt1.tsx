import {
  Box,
  Container,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { CustomInput } from "../../components/Input/CustomInput";
import {
  Option as CustomOption,
  CustomSelect,
} from "../../components/Select/CustomSelect";
import { useDevice } from "../../hooks/useDevice";
import { MaterialSymbolsClose } from "../../shared/icons/Icon";
import { eggPrices } from "../Home/Home";
export const CreateFormOpt1 = () => {
  const { isMobile } = useDevice();
  return (
    <Container>
      <Paper elevation={isMobile ? 0 : 1} sx={{ padding: { xs: 0, sm: 2 } }}>
        <TitleText>Chọn loại và nhập số lượng</TitleText>

        <Grid container spacing={1}>
          {eggPrices.map((type) => (
            <Grid item xs={6}>
              <MixBox type={type.type} price={type.price} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* <Paper elevation={1} sx={{ padding: 2 }}></Paper> */}
    </Container>
  );
};

const MixBox = ({ type, price }: { type: string; price: number }) => {
  const numberInputRef = useRef<HTMLDivElement | null>(null);
  const priceInputRef = useRef<HTMLButtonElement | null>(null);
  const { isMobile } = useDevice();
  const [active, setActive] = useState(false);

  let dealPriceOptions = [
    {
      value: price,
      key: 0,
    },
    {
      value: price - 25,
      key: 1,
    },
    {
      value: price - 50,
      key: 2,
    },
    {
      value: price - 75,
      key: 3,
    },
    {
      value: price - 100,
      key: 4,
    },
  ];
  const handleActive = () => {
    console.log("active call");
    setActive(true);
  };

  useEffect(() => {
    if (numberInputRef.current) {
      if (numberInputRef.current.firstChild) {
        if (active) {
          // @ts-ignore
          numberInputRef.current.firstChild.style.backgroundColor = "";
        } else {
          // @ts-ignore
          numberInputRef.current.firstChild.style.backgroundColor = grey["300"];
        }
      }
    }
  }, [active]);

  const handleInActive = () => {
    if (numberInputRef.current && priceInputRef.current) {
      if (numberInputRef.current.firstChild) {
        // @ts-ignore
        numberInputRef.current.firstChild.value = "";
      }
      priceInputRef.current.innerHTML = price.toString();
    }
    setActive(false);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 8,
        backgroundColor: active ? "green" : "",
        position: "relative",
      }}
      onClick={!active ? handleActive : () => {}}
    >
      {active && (
        <Box sx={{ position: "absolute", top: "-15px", right: "-10px" }}>
          <Fab
            size="small"
            color="error"
            aria-label="add"
            onClick={handleInActive}
          >
            <MaterialSymbolsClose />
          </Fab>
        </Box>
      )}
      <TypeText>{type}</TypeText>

      <Stack mt={1.25} spacing={1.5} alignItems={isMobile ? "none" : "center"}>
        <Box>
          <Text> Giá đề xuất: </Text>
          <PriceText>{price}</PriceText>
        </Box>
        <Box>
          <Text> Giá mặc cả: </Text>
          <CustomSelect
            style={{
              backgroundColor: !active ? grey["300"] : "",
              color: !active ? grey["600"] : "",
            }}
            ref={priceInputRef}
            defaultValue={dealPriceOptions[0].value}
          >
            {dealPriceOptions.map((price, index) => (
              <CustomOption
                sx={{ fontWeight: index ? 500 : 900 }}
                key={index}
                value={price.value}
              >{`${price.value}`}</CustomOption>
            ))}
          </CustomSelect>
        </Box>
        <Box>
          <Text> Số lượng </Text>
          <CustomInput
            ref={numberInputRef}
            style={{
              width: "100% !important",
              textAlign: "center",
            }}
            type="number"
            placeholder="Nhập số lượng"
          />
        </Box>
      </Stack>
    </div>
  );
};

const Text = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
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

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 800,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
