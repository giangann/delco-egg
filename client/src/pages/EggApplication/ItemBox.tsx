import { Box, Stack, Typography, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BaseInput } from "../../components/Input/BaseInput";
import { CustomSelect, Option } from "../../components/Select/CustomSelect";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { generateDealPrices } from "../../shared/helpers/function";
import { IEggPriceQty } from "../../shared/types/egg";
import { IOrderItem } from "../../shared/types/order";
import { GREEN, GREY, RED } from "../../styled/color";
import { BoxHeadingText } from "../../styled/styled";
import { FormContext } from "./CreateForm";

type ItemBoxProps = {
  item: IEggPriceQty;
  index: number;
};
export const ItemBox = ({ item, index }: ItemBoxProps) => {
  const [active, setActive] = useState(false);
  const listDealPrice = generateDealPrices(item.price_1, 25);
  const form = useContext(FormContext).form;
  const [searchParams, setSearchParams] = useSearchParams();

  const onActive = (index: number) => {
    form?.setValue(`orders.${index}.egg_id`, item.egg_id);
    setActive(true);
  };

  const deActive = (index: number) => {
    form?.unregister(`orders.${index}`);
    updateOrdersParams();

    setActive(false);
  };

  const updateOrdersParams = () => {
    const getOrdersForm: IOrderItem[] | undefined = form?.getValues("orders");

    if (getOrdersForm && getOrdersForm?.length) {
      const orders = getOrdersForm.filter((order) => Boolean(order));
      if (orders) searchParams.set("orders", JSON.stringify(orders));
    } else {
      searchParams.set("orders", JSON.stringify([]));
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const orders: IOrderItem[] | undefined = JSON.parse(
      searchParams.get("orders") as string
    );

    if (orders?.length) {
      const order = orders.filter((order) => order.egg_id === item.egg_id)[0];

      if (order) {
        form?.setValue(`orders.${index}`, order);
        setActive(true);
      }
    }
  }, []);

  return (
    <BoxWrapper active={active}>
      <ChooseButton
        onClick={active ? () => deActive(index) : () => onActive(index)}
        active={active}
      >
        {active ? "Hủy" : "Chọn"}
      </ChooseButton>
      <Box
        p={2}
        sx={{
          opacity: active ? 1 : 0.5,
        }}
      >
        <BoxHeading active={active}>
          <BoxHeadingText textAlign={"center"}>
            {item.egg.type_name.toLocaleUpperCase()}
          </BoxHeadingText>
        </BoxHeading>
        <Row name="Giá đề xuất" value={`${item.price_1} đ`} />
        <Row name="Còn lại" value={`${item.quantity} quả`} />
        <Row
          name="Chọn mức giá"
          value={
            <CustomSelect
              slotProps={{
                popper: { disablePortal: true },
              }}
              onChange={(event) => {
                // @ts-ignore
                let newVal = event?.target.value;
                form?.setValue(`orders.${index}.deal_price`, parseInt(newVal));
                updateOrdersParams();
              }}
              style={{ width: "100%" }}
              defaultValue={
                form?.getValues(`orders.${index}.quantity`) || item.price_1
              }
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
          value={
            <BaseInput
              required={active}
              type="number"
              onChange={(event) => {
                let newVal = event.target.value;
                form?.setValue(`orders.${index}.quantity`, parseInt(newVal));
              }}
              onBlur={updateOrdersParams}
              disabled={!active}
              style={{ width: "100%" }}
              err={form?.formState.errors.orders?.[index]?.quantity?.message}
              defaultValue={form?.getValues(`orders.${index}.quantity`)}
            />
          }
        />
      </Box>
    </BoxWrapper>
  );
};

const Row = ({
  name,
  value,
}: {
  name: string;
  value: string | number | React.ReactNode;
}) => {
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
const BoxWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  border: `1px solid ${active ? GREEN["600"] : GREY["100"]}`,
  backgroundColor: active ? `${GREEN["500"]}${OPACITY_TO_HEX["20"]}` : "none",

  [theme.breakpoints.up("sm")]: {},
}));

const BoxHeading = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  backgroundColor: active ? GREEN["500"] : "#cccccc",
  color: active ? "white" : "black",
  padding: 8,
  [theme.breakpoints.up("sm")]: {},
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
