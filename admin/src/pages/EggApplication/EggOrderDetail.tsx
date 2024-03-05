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
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import {
  diffDateTimeWithNow,
  numberWithComma,
  screenPathRemoveSlug,
  timeWithoutSecond,
  toDayOrTomorrowOrYesterday,
} from "../../shared/helper";
import { IOrder, IOrderItem } from "../../shared/types/order";
import { FakeATag, alignCenterSx } from "../../styled/styled";
import { OrderActionByStatus } from "./OrderActionByStatus";
import { TrackingStatusBlock } from "./TrackingStatusBlock";
import { NotiContext } from "../../contexts/NotiContext";

export const EggOrderDetail = () => {
  const [refetch, setRefetch] = useState(0);
  const refetchNoti = useContext(NotiContext).refetch;
  const [order, setOrder] = useState<IOrder | null>(null);
  const navigate = useNavigate();
  const goBackList = () => {
    navigate(SCREEN_PATHS.APPLICATION.LIST);
  };

  const triggerRefetch = () => {
    setRefetch(refetch + 1);
    refetchNoti();
  };
  const params = useParams();

  useEffect(() => {
    async function fetchOrderById() {
      const res = await getApi<IOrder>(`order/${params.id}`);
      if (res.success) {
        setOrder(res.data);
      }
    }
    fetchOrderById();
  }, [refetch, params]);

  return (
    <Page title="Chi tiết đơn" onGoBack={goBackList}>
      {!order ? (
        <NoOrderData />
      ) : (
        <Grid container spacing={{ xs: 3, sm: 5 }}>
          {/* status */}
          <Grid item xs={12}>
            <BoxByStatus margin={"0 auto"} status={order.status} />

            {order.notis.map((noti) => (
              <TrackingStatusBlock
                newStatus={noti.new_status}
                adminName={noti.from_user.fullname}
                dateTime={dayjs(noti.createdAt).format("DD/MM/YYYY HH:mm")}
                diffTime={diffDateTimeWithNow(noti.createdAt)}
                reason={order.reason}
              />
            ))}
          </Grid>

          {/* table */}
          <Grid item xs={12} sm={6}>
            <BoxWrapper>
              <HeadingText> 1. Đơn hàng </HeadingText>
              <Box sx={{ marginTop: 1 }}>
                <Typography textAlign={"left"}>
                  {`Tạo lúc ${dayjs(order.createdAt).format(
                    "DD/MM/YYYY HH:mm"
                  )} `}
                  <span style={{ fontWeight: 600 }}>{`<${diffDateTimeWithNow(
                    order.createdAt as string
                  )}>`}</span>
                </Typography>
              </Box>
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
                  {order.items.map((row: IOrderItem) => (
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
            </BoxWrapper>
          </Grid>

          {/* time */}
          <Grid item xs={12} sm={6}>
            <BoxWrapper>
              <HeadingText mb={1}> 2. Thời gian </HeadingText>
              <GridOuter container>
                <Grid item xs={9}>
                  <UserInfoRow
                    property="Ngày:"
                    value={
                      `${dayjs(order.date).format(
                        "DD/MM/YYYY"
                      )} <${toDayOrTomorrowOrYesterday(order.date)}>` as string
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <UserInfoRow
                    property="Giờ:"
                    value={timeWithoutSecond(order.time as string)}
                  />
                </Grid>
              </GridOuter>
            </BoxWrapper>
          </Grid>

          {/* User info */}
          <Grid item xs={12} sm={6}>
            <BoxWrapper>
              <Stack mb={1} direction={"row"} spacing={2} alignItems={"center"}>
                <HeadingText> 3. Thông tin người đặt</HeadingText>
                <FakeATag
                  to={`${screenPathRemoveSlug(SCREEN_PATHS.USER.DETAIL)}/${
                    order.user?.id
                  }`}
                >
                  <Typography>{">> chi tiết"}</Typography>
                </FakeATag>
              </Stack>
              <GridOuter container columnSpacing={4}>
                <Grid item xs={6} sm={6}>
                  <UserInfoRow
                    property="Họ tên:"
                    value={order.user?.fullname as string}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <UserInfoRow
                    property="Số điện thoại:"
                    value={
                      <a href={`tel:${order.user?.phone_number}`}>
                        <BoxFieldValue>
                          {order.user?.phone_number}
                        </BoxFieldValue>
                      </a>
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <UserInfoRow
                    property="Tên tài khoản:"
                    value={order.user?.username as string}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <UserInfoRow
                    property="Công ty:"
                    value={order.user?.company_name || "KXĐ"}
                  />
                </Grid>
              </GridOuter>
            </BoxWrapper>
          </Grid>

          <Grid item xs={12}>
            <OrderActionByStatus
              triggerRefetch={triggerRefetch}
              status={order.status}
              orderId={order.id}
            />
          </Grid>
        </Grid>
      )}
    </Page>
  );
};

function subtotal(items: IOrderItem[]) {
  return items
    .map(({ deal_price, quantity }) => deal_price * quantity)
    .reduce((sum, i) => sum + i, 0);
}

const NoOrderData = () => {
  return (
    <Box height={"50vh"} sx={{ ...alignCenterSx }}>
      <Typography variant="h4">{"Không có dữ liệu"}</Typography>
    </Box>
  );
};

type Row = {
  property: string;
  value: string | React.ReactNode;
};

const UserInfoRow = ({ property, value }: Row) => {
  return (
    <BoxContent>
      <BoxFieldName>{property}</BoxFieldName>
      {typeof value === "string" ? (
        <BoxFieldValue>{value}</BoxFieldValue>
      ) : (
        value
      )}
    </BoxContent>
  );
};

const TotalText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,

  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 22,
  [theme.breakpoints.up("sm")]: {
    fontSize: 24,
  },
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontSize: 16,
  paddingLeft: 6,
  paddingRight: 6,
  paddingTop: 12,
  paddingBottom: 12,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },
}));

const TableCellHeader = styled(TableCellStyled)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: "underline",
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: 4,
  [theme.breakpoints.up("sm")]: {},
}));

const GridOuter = styled(Grid)(({ theme }) => ({
  paddingLeft: 8,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldName = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 450,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

const BoxFieldValue = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));
