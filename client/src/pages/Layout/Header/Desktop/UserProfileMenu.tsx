import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { IconamoonProfileCircleFill } from "../../../../shared/icons/Icon";

export const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    console.log("logout");
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
        <MenuItem onClick={handleClose}>Thông tin</MenuItem>
        <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </>
  );
};
