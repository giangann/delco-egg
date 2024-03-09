import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import {
  RowStatisticStyled,
  StackAlignCenterJustifySpaceBetween,
} from "../../styled/styled";

export const EggManage = () => {
  const navigate = useNavigate();
  return (
    <Page title="Quản lý trứng">
      {eggManageItems.map((item) => (
        <RowStatisticStyled mt={2} onClick={() => navigate(item.path)}>
          <StackAlignCenterJustifySpaceBetween>
            <Typography fontSize={18}>{item.text} </Typography>
            <div>{">>"}</div>
          </StackAlignCenterJustifySpaceBetween>
        </RowStatisticStyled>
      ))}
    </Page>
  );
};

const eggManageItems = [
  {
    path: SCREEN_PATHS.MANAGE.EGG.UPDATE_PRICE,
    text: "Cập nhật giá trứng",
  },
  {
    path: SCREEN_PATHS.MANAGE.EGG.UPDATE_QUANTITY,
    text: "Cập nhật số lượng trứng",
  },
  {
    path: SCREEN_PATHS.MANAGE.EGG.LIST,
    text: "Danh sách loại trứng",
  },
  {
    path: SCREEN_PATHS.MANAGE.EGG.CREATE,
    text: "Tạo mới loại trứng",
  },
];
