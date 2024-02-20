import {
  Box,
  Grid,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoxByStatus } from "../../components/Box/BoxByStatus";
import { Page } from "../../components/Page/Page";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import {
  diffDateTimeWithNow,
  numberWithComma,
  timeWithoutSecond,
  toDayOrTomorrowOrYesterday,
} from "../../shared/helpers/function";
import { IOrderDetail, IOrderItem } from "../../shared/types/order";
import { alignCenterSx } from "../../styled/styled";
import { TrackingStatusBlock } from "./TrackingStatusBlock";

export const DetailForm = () => {
  const [order, setOrder] = useState<IOrderDetail | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  const goBackList = () => {
    navigate(SCREEN_PATHS.LIST);
  };

  useEffect(() => {
    async function fetchOrderById() {
      const res = await getApi(`order/${params.id}`);
      setOrder(res.data);
    }
    fetchOrderById();
  }, [params]);
  return (
    <Page title="Chi tiết đơn" onGoBack={goBackList}>
      {/* table */}
      {!order ? (
        <NoOrderData />
      ) : (
        <>
          <Box mt={2}>
            <BoxByStatus margin={"unset !important"} status={order.status} />

            {order.notis.map((noti) => (
              <TrackingStatusBlock
                newStatus={noti.new_status}
                adminName={noti.from_user.fullname}
                dateTime={dayjs(noti.createdAt).format("DD/MM/YYYY HH:mm")}
                diffTime={diffDateTimeWithNow(noti.createdAt)}
                reason={order.reason}

              />
            ))}

            <Stack
              mt={4}
              alignItems={"center"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <HeadingText> 1. Đơn hàng </HeadingText>
            </Stack>
            <Typography textAlign={"left"}>
              {`Tạo lúc ${dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")} `}
              <span style={{ fontWeight: 600 }}>{`<${diffDateTimeWithNow(
                order.createdAt as string
              )}>`}</span>
            </Typography>

            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableCellHeader>Loại</TableCellHeader>
                  <TableCellHeader>{"Đơn giá"}</TableCellHeader>
                  <TableCellHeader>Số lượng</TableCellHeader>
                  <TableCellHeader> Thành tiền </TableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((row) => (
                  <TableRow key={row.egg_id}>
                    <TableCellStyled>{row.egg?.type_name}</TableCellStyled>
                    <TableCellStyled>{row.deal_price}</TableCellStyled>
                    <TableCellStyled>{row.quantity}</TableCellStyled>
                    <TableCellStyled>
                      {numberWithComma(row.deal_price * row.quantity)}
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
                      {numberWithComma(subtotal(order.items))} đ
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
              value={`${dayjs(order.date).format(
                "DD/MM/YYYY"
              )} <${toDayOrTomorrowOrYesterday(order.date)}>`}
            />
            <DateAndTimeRow
              property={"- Giờ: "}
              value={timeWithoutSecond(order.time as string)}
            />
          </Box>
        </>
      )}
    </Page>
  );
};

const NoOrderData = () => {
  return (
    <Box height={"50vh"} sx={{ ...alignCenterSx }}>
      <Typography variant="h4">{"Không có dữ liệu"}</Typography>
    </Box>
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
  paddingLeft: 6,
  paddingRight: 6,
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

