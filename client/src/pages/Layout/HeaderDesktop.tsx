import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import {
  IconParkHamburgerButton,
  IconamoonProfileCircleFill,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../shared/icons/Icon";
import { BACKGROUND_COLOR } from "../../styled/color";
import { LinkCustom } from "../../styled/styled";

export const HeaderDesktop = () => {
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: BACKGROUND_COLOR["HEADER"],
        height: 70,
      }}
    >
      <Box>
        <IconButton>
          <IconParkHamburgerButton style={{ color: "black" }} />
        </IconButton>
      </Box>
      <Box>
        <LinkCustom to="/">
          <Typography
            variant="h1"
            style={{ color: "white", fontWeight: 900, fontSize: 18 }}
          >
            Delco Egg
          </Typography>
        </LinkCustom>
      </Box>
      <Box>
        <IconButton>
          <MaterialSymbolsNotificationsActiveRounded
            style={{ color: "white" }}
          />
        </IconButton>

        <IconButton onClick={handleClick}>
          <IconamoonProfileCircleFill style={{ color: "white" }} />
        </IconButton>
      </Box>

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
    </Box>
  );
};
