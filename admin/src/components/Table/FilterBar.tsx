import { Box, Grid, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDevice } from "../../hooks/useDevice";
import {
  IcBaselineFilterAlt,
  MaterialSymbolsArrowCircleRight,
} from "../../shared/icons/Icon";
import { UnknownObj } from "../../shared/types/base";
import { GREEN } from "../../styled/color";
import {
  BoxFlexEnd,
  ButtonResponsive,
  InputLabelText,
} from "../../styled/styled";
import { CustomInput } from "../Input/CustomInput";
import { StrictField } from "./Customtable";
import { useNavigate } from "react-router-dom";

type FilterBarProps<TData extends UnknownObj> = {
  onResetParams: () => void;
  fields: StrictField<TData>[];
  createRoute?: string;
} & UseFormReturn;

export const FilterBar = <TData extends UnknownObj>({
  onResetParams,
  fields,
  register,
  createRoute,
}: FilterBarProps<TData>) => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef(null);
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const handleOpen = () => {
    if (filterRef.current !== null) {
      if (
        filterRef.current["style"]["maxHeight"] != "0px" &&
        filterRef.current["style"]["maxHeight"] != 0
      ) {
        // close
        filterRef.current["style"]["maxHeight"] = "0px" as never;
        filterRef.current["style"]["marginTop"] = "0px" as never;
      } else {
        // open
        filterRef.current["style"]["maxHeight"] = (filterRef.current[
          "scrollHeight"
        ] + "px") as never;
      }
    }
    setOpen(!open);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <ButtonResponsive
          onClick={handleOpen}
          variant={open ? "contained" : "outlined"}
          endIcon={
            <IcBaselineFilterAlt
              color={open ? "white" : GREEN["500"]}
              style={{ fontSize: isMobile ? 16 : 24 }}
            />
          }
        >
          Lọc
        </ButtonResponsive>
        {createRoute && (
          <ButtonResponsive
            onClick={() => {
              navigate(createRoute);
            }}
            variant="contained"
            endIcon={
              <MaterialSymbolsArrowCircleRight
                color={"white"}
                style={{ fontSize: isMobile ? 16 : 24 }}
              />
            }
          >
            Tạo mới
          </ButtonResponsive>
        )}
      </Stack>

      <Box
        sx={{
          border: `1px solid ${GREEN["500"]}`,
          boxSizing: "border-box",
          transition: "all 0.5s",
          maxHeight: 0,
          overflow: "hidden",
        }}
        ref={filterRef}
      >
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {fields.map((field, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <InputLabelText>{field["header"]}</InputLabelText>
                <CustomInput
                  {...register(field.fieldKey as string)}
                  placeholder={`Tìm theo "${field.header}"`}
                />
              </Grid>
            ))}
          </Grid>
          <BoxFlexEnd>
            <ButtonResponsive
              sx={{ ml: 1 }}
              variant="contained"
              color="warning"
              onClick={onResetParams}
            >
              Xóa lọc
            </ButtonResponsive>
            <ButtonResponsive sx={{ ml: 1 }} variant="contained" type="submit">
              Lọc
            </ButtonResponsive>
          </BoxFlexEnd>
        </Box>
      </Box>
    </>
  );
};
