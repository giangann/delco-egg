import { Box, IconButton, Typography, styled } from "@mui/material";
import { useState } from "react";
import { MobileDrawer } from "../../../../components/Drawer/MobileDrawer";
import {
  MaterialSymbolsClose,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../../../shared/icons/Icon";
import { BoxAbsoluteFullAlignRight } from "../../../../styled/styled";
import { CustomIconBtn } from "./HeaderMobile";
export const NotificationMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <CustomIconBtn onClick={onOpenDrawer}>
        <MaterialSymbolsNotificationsActiveRounded style={{ color: "white" }} />
      </CustomIconBtn>
      <MobileDrawer open={openDrawer} onClose={onCloseDrawer}>
        <Box sx={{ p: 4, color: "white" }}>
          <Box position={"relative"}>
            <TitleText variant="h6">Thông báo</TitleText>
            <BoxAbsoluteFullAlignRight>
              <IconButton
                onClick={onCloseDrawer}
                sx={{ border: "1px solid white", p: 0.5 }}
              >
                <MaterialSymbolsClose fontSize={24} color={"white"} />
              </IconButton>
            </BoxAbsoluteFullAlignRight>
          </Box>
          <NotiItem handleClose={onCloseDrawer} />
          <NotiItem handleClose={onCloseDrawer} />
        </Box>
      </MobileDrawer>
    </>
  );
};

const NotiItem = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Box
      component="div"
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
        borderBottom: "1px solid #ccc",
        py: 2,
      }}
      onClick={handleClose}
    >
      <Box>
        <NotiTitleText>Đơn mới</NotiTitleText>
      </Box>
      <NotiContentText>
        User vừa tạo đơn mới đợi bạn phê duyệt, click để xem chi tiết
      </NotiContentText>
      <NotiDateTimeText>28/12 4:50</NotiDateTimeText>
    </Box>
  );
};

const TitleText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 700,
  fontSize: 28,
  [theme.breakpoints.down("sm")]: {},
}));

const NotiTitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  [theme.breakpoints.down("sm")]: {},
}));

const NotiContentText = styled(Typography)(({ theme }) => ({
  marginTop: 4,
  fontSize: 15,
  [theme.breakpoints.down("sm")]: {},
}));
const NotiDateTimeText = styled(Typography)(({ theme }) => ({
  marginTop: 4,
  fontSize: 15,
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {},
}));
