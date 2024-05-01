import { Box, Paper, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoOrderBox } from "../../components/Box/NoOrderBox";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { numberWithComma } from "../../shared/helper";
import { IcOutlineNavigateNext } from "../../shared/icons/Icon";
import {
  FakeATag,
  RowStatisticStyled,
  StackAlignCenterJustifySpaceBetween,
} from "../../styled/styled";
import { IOrderStatistic } from "../Statistic/Order/OrderTotalStatistic";

export const ClientDetailRecentOrder = () => {
  const [orderList, setOrderList] = useState<IOrderStatistic[]>([]);
  const params = useParams();

  useEffect(() => {
    async function fetchOrderList() {
      const response = await getApi<IOrderStatistic[]>("order", {
        user_id: `${params?.id}`,
        limit: `${5}`,
      });
      if (response.success) setOrderList(response.data);
    }
    fetchOrderList();
  }, []);
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <StackAlignCenterJustifySpaceBetween>
        <BoxTitle>{"Đơn hàng gần đây"}</BoxTitle>
        <FakeATag to={`${SCREEN_PATHS.MANAGE.APPLICATION.LIST}`}>
          <Typography>{">> xem thêm"}</Typography>
        </FakeATag>
      </StackAlignCenterJustifySpaceBetween>

      <Box my={3}>
        {!orderList.length ? (
          <NoOrderBox />
        ) : (
          orderList.map((order) => <Order order={order} />)
        )}
      </Box>
    </Paper>
  );
};

const Order = ({ order }: { order: IOrderStatistic }) => {
  const navigate = useNavigate();
  const onViewDetail = (id: number | string) => {
    let path = SCREEN_PATHS.MANAGE.APPLICATION.DETAIL;
    let arrPathBySlash = path.split("/");
    arrPathBySlash.pop();

    let newPathWithoutSlug = arrPathBySlash.join("/");
    navigate(`${newPathWithoutSlug}/${id}`);
  };
  return (
    <RowStatisticStyled
      sx={{ mt: 1.25, pb: 1.25 }}
      component={"div"}
      onClick={() => onViewDetail(order.id)}
    >
      <StackAlignCenterJustifySpaceBetween>
        <Box>
          <StackAlignCenterJustifySpaceBetween>
            <Typography sx={{ fontWeight: 400, fontSize: 18 }}>
              Order #{order.id}
            </Typography>
            <Typography sx={{ ml: 4, fontWeight: 500, fontSize: 18 }}>
              Giá trị{": "}
              <span style={{ fontWeight: 650 }}>
                {numberWithComma(order.total)} đ
              </span>
            </Typography>
          </StackAlignCenterJustifySpaceBetween>
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            {"User: "}
            <span style={{ fontWeight: 650 }}>{order.fullname}</span>
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            {"Công ty: "}
            <span style={{ fontWeight: 650 }}>{order.company_name}</span>
          </Typography>
        </Box>
        <IcOutlineNavigateNext />
      </StackAlignCenterJustifySpaceBetween>
    </RowStatisticStyled>
  );
};

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 22,
  [theme.breakpoints.up("sm")]: {
    fontSize: 24,
  },
}));
