import {
  Box,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext } from "react";
import { Page } from "../../components/Page/Page";
import {
  numberWithComma,
  timeWithoutSecond,
  toDayOrTomorrowOrYesterday,
} from "../../shared/helpers/function";
import { IOrderItem } from "../../shared/types/order";
import { FormContext } from "./CreateForm";

export const Step3 = () => {
  const form = useContext(FormContext).form;
  const listEggPriceQty = useContext(FormContext).data;
  const orderItems = form?.getValues().items || [];
  const date = form?.getValues().date;
  const time = form?.getValues().time;

  const eggByEggId = (egg_id: number) => {
    return listEggPriceQty.filter((item) => item.egg_id == egg_id)[0];
  };

  return (
    <Page title="Xác nhận">
      {/* table */}
      <Box mt={2}>
        <HeadingText> 1. Đơn hàng </HeadingText>
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCellHeader>Loại</TableCellHeader>
              <TableCellHeader>{"Đơn giá "}</TableCellHeader>
              <TableCellHeader>Số lượng</TableCellHeader>
              <TableCellHeader> Thành tiền </TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((row) => (
              <TableRow key={row.egg_id}>
                <TableCellStyled>
                  {eggByEggId(row.egg_id).egg.type_name}
                </TableCellStyled>
                <TableCellStyled>{row.deal_price}</TableCellStyled>
                <TableCellStyled>{row.quantity}</TableCellStyled>
                <TableCellStyled>
                  {row.deal_price * row.quantity}
                </TableCellStyled>
              </TableRow>
            ))}
            <TableRow>
              <TableCellStyled
                colSpan={3}
                sx={{ textAlign: "right !important" }}
              >
                <TotalText fontWeight={900}>Tổng</TotalText>
              </TableCellStyled>
              <TableCellStyled>
                <TotalText>
                  {numberWithComma(subtotal(orderItems as IOrderItem[]))} đ
                </TotalText>
              </TableCellStyled>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Box>

      {/* time */}
      <Box mt={4}>
        <HeadingText mb={1}> 2. Thời gian </HeadingText>
        <DateAndTimeRow
          property={"- Ngày: "}
          value={`${dayjs(date).format(
            "DD/MM/YYYY"
          )} <${toDayOrTomorrowOrYesterday(date)}>`}
        />
        <DateAndTimeRow
          property={"- Giờ: "}
          value={timeWithoutSecond(time) as string}
        />
      </Box>
    </Page>
  );
};
const DateAndTimeRow = ({
  property,
  value,
}: {
  property: string;
  value: string;
}) => {
  return (
    <Grid container>
      <Grid item xs={3} sm={1.6} md={1}>
        <SubHeadingTextKey>{property} </SubHeadingTextKey>
      </Grid>
      <SubHeadingTextValue>{value}</SubHeadingTextValue>
    </Grid>
  );
};
function subtotal(items: IOrderItem[]) {
  return items
    .map(({ deal_price, quantity }) => deal_price * quantity)
    .reduce((sum, i) => sum + i, 0);
}
const TotalText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 18,

  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 20,
  [theme.breakpoints.up("sm")]: {
    fontSize: 22,
  },
}));
const SubHeadingTextKey = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));
const SubHeadingTextValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));
const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontSize: 16,
  paddingLeft: 9,
  paddingRight: 9,
  paddingTop: 16,
  paddingBottom: 16,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },
}));

const TableCellHeader = styled(TableCellStyled)(({ theme }) => ({
  fontWeight: 650,
  textDecoration: "underline",
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {},
}));
