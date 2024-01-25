import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { alignCenterSx } from "../../styled/styled";
import styles from "./styles.module.css";

type Item = {
  label: string | number;
  value: any;
  key?: number;
};
type BaseSelectProps = {
  items: Item[];
  onChange?: (value: Item) => void;
};
export const BaseSelect = ({ items }: BaseSelectProps) => {
  const btnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toogleOpen = () => {
    setOpen(!open);
  };
  const [value, setValue] = useState();

  // render a list, each component has it own value
  return (
    <Box maxWidth={300} mt={10}>
      <button style={{ width: "100%" }} onClick={toogleOpen}>
        <Typography>{items[0].value}</Typography>
      </button>
      <Box position={"relative"} width="100%">
        <ul
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            display: open ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            listStyleType: "none",
            paddingLeft: 0,
            margin: 0,
          }}
        >
          {items.map((item) => (
            <li
              className={styles.selectItem}
              style={{
                cursor: "pointer",
                width: "100%",
                ...alignCenterSx,
                paddingTop: 2,
                paddingBottom: 2,
              }}
              value={item.value}
              onClick={(event) => {
                event.preventDefault();
                handleClose();
                // @ts-ignore
                console.log(event.target.value);
              }}
            >
              <Typography>{item.label}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
