import {
  Badge,
  Box,
  IconButton,
  Menu,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../../../shared/constants/screenPaths";
import { MaterialSymbolsNotificationsActiveRounded } from "../../../../shared/icons/Icon";
import { INoti } from "../../../../shared/types/noti";
import { alignCenterSx } from "../../../../styled/styled";
import { BLUE, GREEN } from "../../../../styled/color";
import { OPACITY_TO_HEX } from "../../../../shared/constants/common";
import { NotiContext } from "../../../../contexts/NotiContext";

export const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const listNoti = useContext(NotiContext).listNoti;

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
    let path = SCREEN_PATHS.MANAGE.APPLICATION.DETAIL;
    let arrPathBySlash = path.split("/");
    arrPathBySlash.pop();

    let newPathWithoutSlug = arrPathBySlash.join("/");
    navigate(`${newPathWithoutSlug}/${orderId}`);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={listNoti.filter((noti) => !noti.is_read).length}
          color="error"
        >
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
        <Box>
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
  id,
  is_read,
}: NotiItemProps) => {
  const noti = useContext(NotiContext);
  const onClick = async () => {
    handleNotiClick(order_id);
    if (!is_read) await noti.maskAsRead(id);
    noti.refetch();
  };
  return (
    <Box
      component="div"
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: `${BLUE["500"]}${OPACITY_TO_HEX["10"]}`,
        },
        borderBottom: "1px solid #ccc",
        py: 2,
        px: 1.25,
        backgroundColor: is_read
          ? "none"
          : `${GREEN["500"]}${OPACITY_TO_HEX["15"]}`,
        opacity: is_read ? 0.75 : 1,
      }}
      onClick={onClick}
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
