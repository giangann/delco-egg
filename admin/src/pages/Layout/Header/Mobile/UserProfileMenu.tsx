import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { IconamoonProfileCircleFill } from "../../../../shared/icons/Icon";
import { CustomIconBtn } from "./HeaderMobile";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";

export const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <MenuItem onClick={handleClose}>Thông tin</MenuItem>
        <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  );
};

