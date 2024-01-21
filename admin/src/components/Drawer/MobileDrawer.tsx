import { Drawer, DrawerProps } from "@mui/material";
import React from "react";
import { BLACK } from "../../../../admin/src/styled/color";

type CustomDrawerProps = DrawerProps & {
  children?: React.ReactNode;
};

// Highlight when an item choossed
export const MobileDrawer = (props: CustomDrawerProps) => {
  const { open, onClose, children, ...drawerProps } = props;
  return (
    <Drawer
      PaperProps={{ sx: { backgroundColor: BLACK["900"] } }}
      anchor="top"
      open={open}
      transitionDuration={200}
      onClose={onClose}
      {...drawerProps}
    >
      {children}
    </Drawer>
  );
};
