import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { IconamoonProfileCircleFill } from "../../../shared/icons/Icon";
import { CustomIconBtn } from "./Mobile/HeaderMobile";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../../shared/constants/screenPaths";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {logout} = useAuth()
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // action 1
  const gotoMyProfile = () => {
    handleClose();
    navigate(`${SCREEN_PATHS.MY_PROFILE}`);
  };

  // action 2: goto Setting page

  // action 3: logout
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) toast.success("Đăng xuất thành công");
    else toast.error('Có lỗi, đăng xuất thất bại')
    handleClose();
  };


  return (
    <>
      <CustomIconBtn onClick={handleClick}>
        <IconamoonProfileCircleFill style={{ color: "white" }} />
      </CustomIconBtn>
      {/* user menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={gotoMyProfile}>Thông tin</MenuItem>
        <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  );
};
