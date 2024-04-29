import { Drawer, DrawerProps } from "@mui/material";
import { BLACK } from "../../styled/color";
import { grey } from "@mui/material/colors";

type CustomDrawerProps = DrawerProps & {
  children?: React.ReactNode;
};
export const MobileFilterDrawer: React.FC<CustomDrawerProps> = ({
  children,
  ...drawerProps
}) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: grey["200"],
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
      }}
      anchor="bottom"
      transitionDuration={200}
      {...drawerProps}
    >
      {children}
    </Drawer>
  );
};
