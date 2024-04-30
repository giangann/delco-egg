import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { PageMobile } from "../../components/Page/PageMobile";
import { BasePagi } from "../../components/Pagi/BasePagi";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
import { OrderListContext } from "../../contexts/OrderListContext";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import {
  diffDateTimeWithNow,
  orderItemsToTotalMoney,
  toDayOrTomorrowOrYesterday,
} from "../../shared/helper";
import { IcOutlineNavigateNext } from "../../shared/icons/Icon";
import { IOrderRow } from "../../shared/types/order";
import { colorByStatus } from "../../styled/color";
import {
  StackAlignCenterJustifySpaceBetween,
  alignCenterSx,
} from "../../styled/styled";
import { FilterList } from "./FilterList";
import { FilterOrder } from "./FilterOrder";

export const EggOrderListMobile = () => {
  return (
    <PageMobile title="Danh sách đơn hàng">
      <FilterList />
      <FilterOrder />
      <OrderList />
    </PageMobile>
  );
};

const OrderList = () => {
  const { orderList, onViewDetail } = useContext(OrderListContext);
  return (
    <Box>
      {!orderList || !orderList.length ? (
        <NoOrder />
      ) : (
        <>
          {orderList.map((order) => (
            <Order order={order} onViewDetail={onViewDetail} />
          ))}
          <Pagination />
        </>
      )}
    </Box>
  );
};

const Pagination = () => {
  const { pagination, setParams } = useContext(OrderListContext);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setParams("page", value);
  };
  return (
    <Box my={1}>
      <BasePagi
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onChange={handleChange}
      />
    </Box>
  );
};

type OrderProps = {
  order: IOrderRow;
  onViewDetail: (row: IOrderRow) => void;
};
const Order = ({ order, onViewDetail }: OrderProps) => {
  return (
    <BoxWrapperOrder
      bgColor={`${colorByStatus(order.status)}${OPACITY_TO_HEX["10"]}`}
      onClick={() => onViewDetail(order)}
    >
      <StackAlignCenterJustifySpaceBetween>
        <Box>
          <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
            {"User: "}
            <Typography
              component={"span"}
              style={{ fontWeight: 550, fontSize: 18 }}
            >
              {order.fullname}
            </Typography>
          </Typography>
        </Box>
        <BoxByStatus status={order.status} />
      </StackAlignCenterJustifySpaceBetween>
      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Công ty: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {order.company_name}
        </Typography>
      </Typography>

      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Tạo lúc: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {diffDateTimeWithNow(order.createdAt)}
        </Typography>
      </Typography>
      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Nhận hàng lúc: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {toDayOrTomorrowOrYesterday(order.date)}
          {" - "}
        </Typography>
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {order.time}
        </Typography>
      </Typography>

      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Tổng tiền: "}
        <Typography
          component={"span"}
          color="blue"
          style={{ fontWeight: 700, fontSize: 20 }}
        >
          {`${orderItemsToTotalMoney(order.items)} đ`}
        </Typography>
      </Typography>

      {/* arrow in the right */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-40%)",
          right: "10px",
          borderRadius: "50%",
          backgroundColor: `#cccccc${OPACITY_TO_HEX["25"]}`,
          padding: 1,
          ...alignCenterSx,
        }}
      >
        <IcOutlineNavigateNext />
      </Box>
    </BoxWrapperOrder>
  );
};

const NoOrder = () => {
  return (
    <Box width={"100%"} minHeight={"300px"} sx={{ ...alignCenterSx }}>
      <Typography fontSize={{ xs: 24, sm: 30 }} fontWeight={550}>
        Không có đơn hàng nào
      </Typography>
    </Box>
  );
};

// const TextKey = styled(Typography)(({ theme }) => ({
//   [theme.breakpoints.up("sm")]: {},
// }));
const BoxWrapperOrder = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  marginTop: "2px",
  padding: "10px",
  backgroundColor: bgColor,
  position: "relative",
}));
