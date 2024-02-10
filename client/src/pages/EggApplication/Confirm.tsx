import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useContext } from "react";
import { Page } from "../../components/Page/Page";
import { IOrderItem } from "../../shared/types/order";
import { FormContext } from "./CreateForm";

interface Row {
  type: string;
  unitPrice: number;
  quantity: number;
  price?: number;
}

export const Confirm = () => {
  const form = useContext(FormContext).form;
  const listEggPriceQty = useContext(FormContext).data;
  const orderItems = form?.getValues().orders || [];
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
              <TableCell>Loại</TableCell>
              <TableCell>{"Đơn giá "}</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell> Thành tiền </TableCell>
            </TableRow>
          </TableHead>

          {orderItems.map((row) => (
            <TableRow key={row.egg_id}>
              <TableCell>{eggByEggId(row.egg_id).egg.type_name}</TableCell>
              <TableCell>{row.deal_price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.deal_price * row.quantity}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ float: { xs: "right", sm: "left" } }}>
            <TableCell>
              <TotalText fontWeight={900}>Tổng</TotalText>
            </TableCell>
            <TableCell>
              <TotalText>{subtotal(orderItems as IOrderItem[])}</TotalText>
            </TableCell>
          </TableRow>
        </TableContainer>
      </Box>

      {/* time */}
      <Box mt={4} mb={2}>
        <HeadingText mb={1}> 2. Thời gian </HeadingText>
        <SubHeadingText mb={0.5}> - Ngày: {date}</SubHeadingText>
        <SubHeadingText> - Giờ: {time}</SubHeadingText>
      </Box>
    </Page>
  );
};

function subtotal(items: IOrderItem[]) {
  return items
    .map(({ deal_price, quantity }) => deal_price * quantity)
    .reduce((sum, i) => sum + i, 0);
}
const TotalText = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  [theme.breakpoints.up("sm")]: {},
}));

const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {},
}));
const SubHeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 16,
  letterSpacing: 1,
  [theme.breakpoints.up("sm")]: {},
}));
