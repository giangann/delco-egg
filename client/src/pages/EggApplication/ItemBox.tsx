import { Box, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import { CustomInput } from "../../components/Input/CustomInput";
import { CustomSelect, Option } from "../../components/Select/CustomSelect";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { generateDealPrices } from "../../shared/helpers/function";
import { IEggPriceQty } from "../../shared/types/egg";
import { GREEN, GREY, RED } from "../../styled/color";
import { BoxHeadingText } from "../../styled/styled";

type ItemBoxProps = {
  item: IEggPriceQty;
};
export const ItemBox = ({ item }: ItemBoxProps) => {
  const [active, setActive] = useState(item.egg_id === 2 ? true : false);
  const listDealPrice = generateDealPrices(item.price_1, 25);
  return (
    <Box
      sx={{
        border: `1px solid ${active ? GREEN["600"] : GREY["100"]}`,
        backgroundColor: active
          ? `${GREEN["500"]}${OPACITY_TO_HEX["20"]}`
          : "none",
      }}
    >
      <ChooseButton onClick={() => setActive(!active)} active={active}>
        {active ? "Hủy" : "Chọn"}
      </ChooseButton>
      <Box
        p={2}
        sx={{
          opacity: active ? 1 : 0.5,
        }}
      >
        <BoxHeadingText
          sx={{
            backgroundColor: active ? GREEN["500"] : "#cccccc",
            color: active ? "white" : "black",
            p: 1,
          }}
          textAlign={"center"}
        >
          {item.egg.type_name.toLocaleUpperCase()}
        </BoxHeadingText>
        <Row name="Giá đề xuất" value={`${item.price_1} đ`} />
        <Row name="Còn lại" value={`${item.quantity} quả`} />
        <Row
          name="Chọn mức giá"
          value={
            <CustomSelect
              slotProps={{
                popper: { disablePortal: true },
              }}
              style={{ width: "100%" }}
              defaultValue={item.price_1}
              disabled={!active}
            >
              {listDealPrice.map((price, index) => (
                <Option
                  sx={{ fontWeight: index ? 500 : 900 }}
                  key={index}
                  value={price}
                  slotProps={{
                    root: { value: price },
                  }}
                >{`${price}`}</Option>
              ))}
            </CustomSelect>
          }
        />

        <Row
          name="Nhập số lượng"
          value={<CustomInput disabled={!active} style={{ width: "100%" }} />}
        />
      </Box>
    </Box>
  );
};

const Row = ({
  name,
  value,
}: {
  name: string;
  value: string | number | React.ReactNode;
}) => {
  console.log("type of value", typeof value);
  return (
    <Stack
      mt={1}
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent={{ xs: "flex-start", sm: "space-between" }}
    >
      <BoxFieldName flexBasis={"50%"} whiteSpace={"nowrap"}>
        {name}
      </BoxFieldName>
      {/* if value is primitive */}

      {typeof value == "string" || typeof value == "number" ? (
        <BoxFieldValue>{value}</BoxFieldValue>
      ) : (
        // if value is reactnode => render element
        <Box flexBasis={{ xs: "auto", sm: "50%" }} width={"100%"}>
          {value}
        </Box>
      )}
    </Stack>
  );
};
const ChooseButton = styled("div", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  backgroundColor: active
    ? `${RED["200"]}${OPACITY_TO_HEX["90"]}`
    : `${GREEN["600"]}${OPACITY_TO_HEX["20"]}`,
  // border: `1px solid ${active ? GREEN["600"] : GREEN["600"]}`,

  // borderRight: `1px solid ${active ? GREEN["600"] : GREEN["600"]}`,
  // borderBottom: `1px solid ${active ? GREEN["600"] : GREEN["600"]}`,
  fontFamily: "Montserrat",
  fontSize: 15,
  color: !active ? GREEN["600"] : "white",
  boxSizing: "border-box",
  padding: "6px 14px",
  width: "fit-content",
  cursor: "pointer",
  fontWeight: 500,
  [theme.breakpoints.up("sm")]: {
    padding: "8px 16px",
    fontSize: 17,
  },
}));
const BoxFieldName = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {
    fontSize: 17,
  },
}));

const BoxFieldValue = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  opacity: 0.9,
  fontSize: 17,
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
}));
