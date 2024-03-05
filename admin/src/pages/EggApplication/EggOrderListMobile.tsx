import { Box, Typography, styled } from "@mui/material";
import { BoxByStatus } from "../../components/Table/BoxByStatus";
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
import { PageMobile } from "../../components/Page/PageMobile";

type EggOrderListMobileProps = {
  myOrderList: IOrderRow[];
  onViewDetail: (row: IOrderRow) => void;
};

export const EggOrderListMobile = ({
  myOrderList,
  onViewDetail,
}: EggOrderListMobileProps) => {
  return (
    <>
      {!myOrderList || !myOrderList.length ? (
        <NoOrder />
      ) : (
        <PageMobile title="Danh sách đơn hàng">
          {myOrderList.map((order) => (
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
          ))}
        </PageMobile>
      )}
    </>
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

const TextKey = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {},
}));
const BoxWrapperOrder = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  marginTop: "2px",
  padding: "10px",
  backgroundColor: bgColor,
  position: "relative",
}));
