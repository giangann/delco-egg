import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { alignCenterSx } from "../../styled/styled";
import styles from "./styles.module.css";

type Item = {
  label: string | number;
  value: any;
  key?: number;
};
type BaseSelectProps = {
  items: Item[];
} & UseFormRegisterReturn;
export const BaseSelect = ({
  items,
  ...useFormRegisterReturns
}: BaseSelectProps) => {
  const [open, setOpen] = useState(false);
  const { onChange } = useFormRegisterReturns;

  console.log(useFormRegisterReturns);

  const toogleOpen = () => {
    setOpen(!open);
  };
  const [value, setValue] = useState(items[0].value);
  const handleChangeValue = (event: any) => {
    console.log(event.target.value);
    onChange(event);
    setValue(event.target.value);

    event.preventDefault();
    event.stopPropagation();
    toogleOpen();
    // @ts-ignore
  };
  // render a list, each component has it own value
  return (
    <Box maxWidth={300}>
      <button style={{ width: "100%" }} onClick={toogleOpen}>
        <Typography>{value}</Typography>
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
                fontFamily: "Montserrat",
                ...alignCenterSx,
                paddingTop: 8,
                paddingBottom: 8,
              }}
              value={item.value}
              onClick={handleChangeValue}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
