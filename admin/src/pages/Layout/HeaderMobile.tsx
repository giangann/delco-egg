import { Box, IconButton, Typography } from "@mui/material";
import {
  IconParkHamburgerButton,
  IconamoonProfileCircleFill,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../shared/icons/Icon";
import { LinkCustom } from "../../styled/styled";
import { useState } from "react";
import { CustomDrawer } from "../../components/Drawer/CustomDrawer";
import { items } from "../Home/Home";

export const HeaderMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const onOpenDrawer = () =>{
    setOpenDrawer(true)
  }
  const onCloseDrawer = () =>{
    setOpenDrawer(false)
  }

  return (
    <Box
      sx={{
        position:'sticky',
        top:0,
        zIndex:4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "green",
      }}
    >
      <Box>
        <IconButton onClick={onOpenDrawer}>
          <IconParkHamburgerButton style={{ color: "black" }} />
        </IconButton>
      </Box>
      <LinkCustom to="/">
        <Typography
          variant="h1"
          style={{ color: "white", fontWeight: 900, fontSize: 18 }}
        >
          Delco Egg
        </Typography>
      </LinkCustom>
      <Box>
        <IconButton>
          <MaterialSymbolsNotificationsActiveRounded
            style={{ color: "white" }}
          />
        </IconButton>

        <IconButton>
          <IconamoonProfileCircleFill style={{ color: "white" }} />
        </IconButton>
      </Box>

      <CustomDrawer item={items} open={openDrawer} onClose={onCloseDrawer} />
    </Box>
  );
};
