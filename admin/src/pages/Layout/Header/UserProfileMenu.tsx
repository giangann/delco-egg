import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { IconamoonProfileCircleFill } from "../../../shared/icons/Icon";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import SCREEN_PATHS from "../../../shared/constants/screenPaths";
import { useNavigate } from "react-router-dom";

export const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const open = Boolean(anchorEl);
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


  const handleLogout = async () => {
    const result = await logout();
    if (result.success) toast.success("Đăng xuất thành công");
    else toast.error("Có lỗi, đăng xuất thất bại");
    handleClose();
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <IconamoonProfileCircleFill style={{ color: "white" }} />
      </IconButton>
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
