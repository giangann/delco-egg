import {
  Box,
  Container,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useDevice } from "../../hooks/useDevice";

interface Row {
  type: string;
  unitPrice: number;
  quantity: number;
  price?: number;
}

export const Confirm = () => {
  const { isMobile } = useDevice();

  return (
    <Container>
      <Paper elevation={isMobile ? 0 : 1} sx={{ padding: { xs: 0, sm: 2 } }}>
        <TitleText mt={4}>Xác nhận</TitleText>

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
        <Box mt={2}>
          <HeadingText> 2. Thời gian </HeadingText>
          <SubHeadingText> - Ngày: 20/01/2024</SubHeadingText>
          <SubHeadingText> - Giờ: 16:25</SubHeadingText>
        </Box>
      </Paper>
    </Container>
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
const TitleText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 24,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
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
  [theme.breakpoints.up("sm")]: {},
}));
