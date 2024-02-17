import {
  Box,
  Drawer,
  DrawerProps,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Item } from "../../pages/Home/Home";
import { IcBaselineArrowDropDown } from "../../shared/icons/Icon";
import { BLACK } from "../../styled/color";
import { LinkCustom } from "../../styled/styled";
import { ResponsiveStyleValue } from "@mui/system";
export type ItemType = {
  children?: ItemType[];
  text: string;
  path: string;
};

type CustomDrawerProps = DrawerProps & {
  item: ItemType[];
  onClose: () => void;
  children?: React.ReactElement;
};

// Highlight when an item choossed
export const CustomDrawer = (props: CustomDrawerProps) => {
  const { item, open, onClose, children, ...drawerProps } = props;
  return (
    <Drawer
      PaperProps={{ sx: { backgroundColor: BLACK["900"], width: "70vw" } }}
      anchor="left"
      open={open}
      transitionDuration={500}
      onClose={onClose}
      {...drawerProps}
    >
      <Box pl={2} py={8}>
        <ItemsBlock
          spacing={4}
          items={[...item, { path: "/", text: "Về Trang Chủ" }]}
          onClose={onClose}
        />
        {children}
      </Box>
    </Drawer>
  );
};

type ItemsBlockProps = {
  items: Item[];
  onClose?: () => void;
  spacing?: ResponsiveStyleValue<number | string>;
};

const ItemsBlock = ({ spacing, items, onClose }: ItemsBlockProps) => {
  return (
    <Box pl={2}>
      <Stack spacing={spacing}>
        {items.map((item, index) => {
          return <ItemRow key={index} item={item} onClose={onClose} />;
        })}
      </Stack>
    </Box>
  );
};

type ItemRowProps = {
  item: Item;
  onClose?: () => void;
};
const ItemRow = ({ item, onClose }: ItemRowProps) => {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(false);
  const hasChild = item?.children;

  const handleOpen = () => {
    if (ref1.current !== null) {
      if (
        ref1.current["style"]["maxHeight"] != "0px" &&
        ref1.current["style"]["maxHeight"] != 0
      ) {
        // close
        ref1.current["style"]["maxHeight"] = "0px" as never;
        ref1.current["style"]["marginTop"] = "0px" as never;
      } else {
        // open
        ref1.current["style"]["maxHeight"] = (ref1.current["scrollHeight"] +
          "px") as never;
        ref1.current["style"]["marginTop"] = "12px" as never;
      }
    }

    setOpen(!open);
  };

  return (
    <Box>
      <Stack direction={"row"} spacing={0}>
        <div onClick={hasChild ? handleOpen : onClose}>
          <LinkCustom to={item.path}>
            <TextDrawer color="white" fontSize={16} fontWeight={500}>
              {item.text}
            </TextDrawer>
          </LinkCustom>
        </div>
        {hasChild && (
          <IcBaselineArrowDropDown
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 0.5s",
            }}
            fontSize={24}
            color="white"
          />
        )}
      </Stack>

      {hasChild && (
        <div
          ref={ref1}
          style={{
            marginTop: 0,
            transition: "all 0.5s",
            color: "white",
            maxHeight: 0,
            overflow: "hidden",
          }}
        >
          <ItemsBlock
            spacing={2}
            items={item.children as Item[]}
            onClose={onClose}
          />
        </div>
      )}
    </Box>
  );
};
const TextDrawer = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
