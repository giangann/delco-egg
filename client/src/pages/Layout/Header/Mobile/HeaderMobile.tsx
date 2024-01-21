import { Box, IconButton, Typography, styled } from "@mui/material";
import { useState } from "react";
import { CustomDrawer } from "../../../../components/Drawer/CustomDrawer";
import {
  IconParkHamburgerButton,
  IconamoonProfileCircleFill,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../../../shared/icons/Icon";
import { BACKGROUND_COLOR } from "../../../../styled/color";
import { AlignCenterBox, LinkCustom, alignCenterSx } from "../../../../styled/styled";
import { items } from "../../../Home/Home";

export const HeaderMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: BACKGROUND_COLOR["HEADER"],
        height: 50,
      }}
    >
      <BoxBasis>
        <IconButton onClick={onOpenDrawer}>
          <IconParkHamburgerButton style={{ color: "black" }} />
        </IconButton>
      </BoxBasis>
      <BoxBasis>
        <Box sx={{ ...alignCenterSx }}>
          <LinkCustom to="/">
            <Typography
              variant="h1"
              style={{ color: "white", fontWeight: 900, fontSize: 18 }}
            >
              Delco Egg
            </Typography>
          </LinkCustom>
        </Box>
      </BoxBasis>
      <BoxBasis>
        <AlignCenterBox justifyContent={"flex-end"}>
          <CustomIconBtn>
            <MaterialSymbolsNotificationsActiveRounded
              style={{ color: "white" }}
            />
          </CustomIconBtn>

          <CustomIconBtn>
            <IconamoonProfileCircleFill style={{ color: "white" }} />
          </CustomIconBtn>
        </AlignCenterBox>
      </BoxBasis>
      <CustomDrawer item={items} open={openDrawer} onClose={onCloseDrawer} />
    </Box>
  );
};

const BoxBasis = styled(Box)({
  // flexGrow: 1,
  flexBasis: "33%",
});

const CustomIconBtn = styled(IconButton)(({ theme }) => ({
  paddingLeft: 0,
  [theme.breakpoints.up("sm")]: {
    padding: 1,
  },
}));
