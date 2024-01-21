import { Box, IconButton, Menu, Typography, styled } from "@mui/material";
import React from "react";
import { MaterialSymbolsNotificationsActiveRounded } from "../../../../shared/icons/Icon";

export const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MaterialSymbolsNotificationsActiveRounded style={{ color: "white" }} />
      </IconButton>
      {/* user menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>
          <NotiTitleText>Đơn bị từ chối</NotiTitleText>
          <NotiContentText>
            Đơn của bạn bị từ chối với lý do giá quá cao, click để xem chi tiết
          </NotiContentText>
          <NotiContentText>28/12 4:50</NotiContentText>
        </MenuItem> */}
        <Box sx={{ px: 1.25 }}>
          <NotiItem handleClose={handleClose} />
          <NotiItem handleClose={handleClose} />
        </Box>
      </Menu>
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
      <NotiTitleText>Đơn bị từ chối</NotiTitleText>
      <NotiContentText>
        Đơn của bạn bị từ chối với lý do giá quá cao,
        <br /> click để xem chi tiết
      </NotiContentText>
      <NotiDateTimeText>28/12 4:50</NotiDateTimeText>
    </Box>
  );
};
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
