import { Badge, Box, IconButton, Typography, styled } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileDrawer } from "../../../../components/Drawer/MobileDrawer";
import { getApi } from "../../../../lib/utils/fetch/fetchRequest";
import { OPACITY_TO_HEX } from "../../../../shared/constants/common";
import SCREEN_PATHS from "../../../../shared/constants/screenPaths";
import {
  MaterialSymbolsClose,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../../../shared/icons/Icon";
import { INoti } from "../../../../shared/types/noti";
import { GREEN } from "../../../../styled/color";
import {
  BoxAbsoluteFullAlignRight,
  alignCenterSx,
} from "../../../../styled/styled";
import { CustomIconBtn } from "./HeaderMobile";
export const NotificationMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [listNoti, setListNoti] = useState<INoti[]>([]);
  const navigate = useNavigate();

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const handleNotiClick = (orderId: number) => {
    onCloseDrawer();
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
      <CustomIconBtn onClick={onOpenDrawer}>
        <Badge badgeContent={listNoti.length} color="error">
          <MaterialSymbolsNotificationsActiveRounded
            style={{ color: "white" }}
          />
        </Badge>
      </CustomIconBtn>
      <MobileDrawer open={openDrawer} onClose={onCloseDrawer}>
        <Box px={2} sx={{ backgroundColor: GREEN["500"], color: "white" }}>
          <Box sx={{ ...alignCenterSx }} height={70} position={"relative"}>
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
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 70px)",
            overflow: "auto",
            color: "white",
          }}
        >
          {listNoti && listNoti?.length ? (
            listNoti.map((noti, index) => (
              <NotiItem {...noti} handleNotiClick={handleNotiClick} />
            ))
          ) : (
            <NoNotification />
          )}
        </Box>
      </MobileDrawer>
    </>
  );
};

type NotiItemProps = {
  handleNotiClick: (orderId: number) => void;
} & INoti;
const NotiItem = ({
  handleNotiClick,
  order_id,
  content,
  from_user,
  createdAt,
  is_read,
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
        px: 4,
        backgroundColor: is_read
          ? "none"
          : `${GREEN["500"]}${OPACITY_TO_HEX["15"]}`,
        opacity: is_read ? 0.75 : 1,
      }}
      onClick={() => handleNotiClick(order_id)}
    >
      <Box>
        <NotiTitleText>Đơn mới</NotiTitleText>
      </Box>
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
