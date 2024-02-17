import {
  Badge,
  Box,
  IconButton,
  Menu,
  Typography,
  styled,
} from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { MaterialSymbolsNotificationsActiveRounded } from "../../../../shared/icons/Icon";
import { INoti } from "../../../../shared/types/noti";
import { getApi } from "../../../../lib/utils/fetch/fetchRequest";
import { alignCenterSx } from "../../../../styled/styled";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../../../shared/constants/screenPaths";

export const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [listNoti, setListNoti] = useState<INoti[]>([]);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotiClick = (orderId: number) => {
    handleClose();
    let path = SCREEN_PATHS.APPLICATION.DETAIL;
    let arrPathBySlash = path.split("/");
    arrPathBySlash.pop();

    let newPathWithoutSlug = arrPathBySlash.join("/");
    navigate(`${newPathWithoutSlug}/${orderId}`);
  };
  useEffect(() => {
    async function fetchListNoti() {
      const fetchListNotiResponse = await getApi("noti");
      if (fetchListNotiResponse.success)
        setListNoti(fetchListNotiResponse.data);
    }
    fetchListNoti();
  }, []);
  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={listNoti.length} color="error">
          <MaterialSymbolsNotificationsActiveRounded
            style={{ color: "white" }}
          />
        </Badge>
      </IconButton>
      {/* user menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ px: 1.25 }}>
          {listNoti && listNoti?.length ? (
            listNoti.map((noti) => (
              <NotiItem {...noti} handleNotiClick={handleNotiClick} />
            ))
          ) : (
            <NoNotification />
          )}
        </Box>
      </Menu>
    </>
  );
};

type NotiItemProps = {
  handleNotiClick: (orderId: number) => void;
} & INoti;
const NotiItem = ({
  handleNotiClick,
  from_user,
  createdAt,
  content,
  order_id,
}: NotiItemProps) => {
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
      onClick={() => handleNotiClick(order_id)}
    >
      <NotiTitleText>{content}</NotiTitleText>
      <NotiContentText>
        Từ:{" "}
        <span style={{ fontWeight: 550, textDecoration: "underline" }}>
          {from_user.username}
        </span>
      </NotiContentText>
      <NotiContentText>{content}</NotiContentText>
      <NotiDateTimeText>
        {dayjs(createdAt).format("DD/MM/YY HH:mm")}
      </NotiDateTimeText>
    </Box>
  );
};

const NoNotification = () => {
  return (
    <Box sx={{ ...alignCenterSx }}>
      <NotiTitleText>{"Không có thông báo"}</NotiTitleText>
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
