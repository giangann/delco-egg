import { Drawer, DrawerProps, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { BLACK } from "../../styled/color";
import { LinkCustom } from "../../styled/styled";

export type ItemType = {
  children?: ItemType[];
  text: string;
  path: string;
};

type CustomDrawerProps = DrawerProps & {
  item: ItemType[];
  children?: React.ReactElement;
};

// Highlight when an item choossed
export const CustomDrawer = (props: CustomDrawerProps) => {
  const { item, open, onClose, children, ...drawerProps } = props;
  return (
    <Drawer
      PaperProps={{ sx: { backgroundColor: BLACK["900"], width: "65vw" } }}
      anchor="left"
      open={open}
      transitionDuration={800}
      onClose={onClose}
      {...drawerProps}
    >
      <Stack sx={{ paddingLeft: 6, py: 12 }} spacing={6}>
        {[...item, { text: "Về trang chủ", path: "/" }].map((item, index) => (
          <Stack key={index} direction="row" spacing={1.5} alignItems="center">
            {/* @ts-ignore */}
            <div onClick={onClose}>
              <LinkCustom to={item.path}>
                <TextDrawer color="white" fontSize={16} fontWeight={500}>
                  {item.text}
                </TextDrawer>
              </LinkCustom>
            </div>
            {/* {(item.children as any) && (
              <>
                <IconButton sx={{ p: 1 }} onClick={handleClick}>
                  <CodiconTriangleDown color="white" fontSize={14} />
                </IconButton>
                <CustomMenu
                  open={openMenu}
                  onClose={handleCloseMenu}
                  item={item?.children as any}
                  anchorEl={anchorEl}
                />
              </>
            )} */}
          </Stack>
        ))}
      </Stack>
      {children}
    </Drawer>
  );
};

const TextDrawer = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
