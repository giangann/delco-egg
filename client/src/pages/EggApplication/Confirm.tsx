import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled
} from "@mui/material";
import { Page } from "../../components/Page/Page";

interface Row {
  type: string;
  unitPrice: number;
  quantity: number;
  price?: number;
}

export const Confirm = () => {

  return (
    <Page title="Xác nhận">
      {/* table */}
      <Box mt={2}>
        <HeadingText> 1. Đơn hàng </HeadingText>
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Loại</TableCell>
              <TableCell>{"Đơn giá (vnđ / 10 quả)"}</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell> Thành tiền </TableCell>
            </TableRow>
          </TableHead>

          {orderItems.map((row) => (
            <TableRow key={row.type}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.unitPrice * row.quantity}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ float: "right" }}>
            <TableCell>
              <TotalText fontWeight={900}>Tổng</TotalText>
            </TableCell>
            <TableCell align="right">
              <TotalText>{subtotal(orderItems)}</TotalText>
            </TableCell>
          </TableRow>
        </TableContainer>
      </Box>

      {/* time */}
      <Box mt={4} mb={2}>
        <HeadingText mb={1}> 2. Thời gian </HeadingText>
        <SubHeadingText mb={0.5}> - Ngày:{"  "}20 / 01 / 2024</SubHeadingText>
        <SubHeadingText> - Giờ:{"  "}16 giờ 25 phút</SubHeadingText>
      </Box>
    </Page>
  );
};

function subtotal(items: readonly Row[]) {
  return items
    .map(({ unitPrice, quantity }) => unitPrice * quantity)
    .reduce((sum, i) => sum + i, 0);
}
const orderItems = [
  {
    type: "Mix 1",
    unitPrice: 3000,
    quantity: 10000,
  },
  {
    type: "Mix 2",
    unitPrice: 2900,
    quantity: 60000,
  },
  {
    type: "Mix 3",
    unitPrice: 2125,
    quantity: 50000,
  },
  {
    type: "Mix 4",
    unitPrice: 2750,
    quantity: 200000,
  },
];
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
