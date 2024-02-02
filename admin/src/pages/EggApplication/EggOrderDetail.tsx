import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDevice } from "../../hooks/useDevice";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import {
  numberWithComma,
  timeWithoutSecond,
  toDayOrTomorrowOrYesterday,
} from "../../shared/helper";
import { IcRoundKeyboardBackspace } from "../../shared/icons/Icon";
import { IOrder, IOrderItem } from "../../shared/types/order";
import dayjs from "dayjs";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import { OrderActionByStatus } from "./OrderActionByStatus";

export const EggOrderDetail = () => {
  const [refetch, setRefetch] = useState(0);
  const [order, setOrder] = useState<IOrder>({
    id: 0,
    status: ORDER_STATUS.WAITING_APPROVAL,
    time: "",
    date: "",
    items: [],
  });
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const goBackList = () => {
    navigate(SCREEN_PATHS.APPLICATION.LIST);
    // window.location.reload()
  };

  const triggerRefetch = () => {
    setRefetch(refetch + 1);
  };
  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function fetchOrderById() {
      const res = await getApi(`order/${params.id}`);
      setOrder(res.data);
    }
    fetchOrderById();
  }, [refetch]);

  return (
    <Container>
      <Paper elevation={isMobile ? 0 : 1} sx={{ padding: { xs: 0, sm: 2 } }}>
        <Box position="relative">
          <Box
            sx={{
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button onClick={goBackList} sx={{ padding: 0 }} variant="outlined">
              <IcRoundKeyboardBackspace fontSize={28} />
            </Button>
          </Box>
          <TitleText mt={4}>Chi tiết đơn</TitleText>
        </Box>

        {/* table */}
        <Box mt={2}>
          <BoxByStatus margin={"unset !important"} status={order.status} />

          <Stack
            mt={4}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <HeadingText> 1. Đơn hàng </HeadingText>
          </Stack>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Loại</TableCell>
                <TableCell>{"Đơn giá"}</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell> Thành tiền </TableCell>
              </TableRow>
            </TableHead>

            {order.items.map((row: IOrderItem) => (
              <TableRow key={row.egg_id}>
                <TableCell>{row.egg?.type_name}</TableCell>
                <TableCell>{row.deal_price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  {numberWithComma(row.deal_price * row.quantity)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ float: "right" }}>
              <TableCell>
                <TotalText fontWeight={900}>Tổng</TotalText>
              </TableCell>
              <TableCell align="right">
                <TotalText>
                  {numberWithComma(subtotal(order.items))} đ
                </TotalText>
              </TableCell>
            </TableRow>
          </TableContainer>
        </Box>

        {/* time */}
        <Box mt={2}>
          <HeadingText> 2. Thời gian </HeadingText>
          <SubHeadingText>
            - Ngày: {dayjs(order.date).format("DD/MM/YYYY")}{" "}
            {`<${toDayOrTomorrowOrYesterday(order.date)}>`}
          </SubHeadingText>
          <SubHeadingText>
            - Giờ: {timeWithoutSecond(order.time)}
          </SubHeadingText>
        </Box>

        {/*  */}
        <Box mt={2}>
          <HeadingText> 3. Thông tin người đặt</HeadingText>
          <SubHeadingText>
            - Tên tài khoản: {order.user?.username}
          </SubHeadingText>
          <SubHeadingText>- Họ tên: {order.user?.fullname}</SubHeadingText>
          <SubHeadingText>
            - Công ty: {order.user?.company_name || "KXĐ"}
          </SubHeadingText>
        </Box>

        <OrderActionByStatus
          triggerRefetch={triggerRefetch}
          status={order.status}
          orderId={order.id}
        />
      </Paper>
    </Container>
  );
};

function subtotal(items: IOrderItem[]) {
  return items
    .map(({ deal_price, quantity }) => deal_price * quantity)
    .reduce((sum, i) => sum + i, 0);
}

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
  fontWeight: 600,
  fontSize: 16,
  [theme.breakpoints.up("sm")]: {},
}));
