import { Box, Grid, Typography, styled } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useDevice } from "../../hooks/useDevice";
import { GREEN } from "../../styled/color";
import { alignCenterSx } from "../../styled/styled";
import { FormContext } from "./CreateForm";
import { BaseInput } from "../../components/Input/BaseInput";
import {
  commonDate,
  commonDateWithMySqlFormat,
} from "../../shared/helpers/function";
import dayjs from "dayjs";

export const DateOptions = () => {
  const form = useContext(FormContext).form;
  const { isMobile } = useDevice();
  const [id, setId] = useState(1);

  return (
    <Box>
      <Grid container columnSpacing={isMobile ? 0 : 4}>
        <Grid item xs={4}>
          <DateBox
            onClick={() => {
              form?.setValue("date", commonDateWithMySqlFormat().today);
              setId(1);
            }}
            active={id === 1}
          >
            <Box>
              <DateName active={id === 1}>{"Hôm nay"}</DateName>
              <DateHelperText active={id === 1}>
                {commonDate().today}
              </DateHelperText>
            </Box>
          </DateBox>
        </Grid>
        <Grid item xs={4}>
          <DateBox
            onClick={() => {
              setId(2);

              form?.setValue("date", commonDateWithMySqlFormat().tomorrow);
            }}
            active={id === 2}
          >
            <Box>
              <DateName active={id === 2}>{"Ngày mai"}</DateName>
              <DateHelperText active={id === 2}>
                {commonDate().tomorrow}
              </DateHelperText>
            </Box>
          </DateBox>
        </Grid>

        <Grid item xs={4}>
          <DateBox
            onClick={() => {
              setId(3);
              form?.setValue("date", commonDateWithMySqlFormat().twoDaysAgo);
            }}
            active={id === 3}
          >
            <Box>
              <DateName active={id === 3}>{"Khác"}</DateName>
              <DateHelperText active={id === 3}>{`Chọn ngày`}</DateHelperText>
            </Box>
          </DateBox>
        </Grid>
        {id === 3 && (
          <>
            <Grid item xs={0} sm={8} />
            <Grid item xs={12} sm={4}>
              <DateBox sx={{ padding: 3 }} active={true}>
                <BaseInput
                  type="date"
                  defaultValue={commonDateWithMySqlFormat().twoDaysAgo}
                  min={commonDateWithMySqlFormat().twoDaysAgo}
                  onChange={(event) =>
                    form?.setValue("date", event.target.value)
                  }
                />
              </DateBox>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
// box has 2 status: active and inactive
const DateBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  padding: 8,
  backgroundColor: active ? GREEN["500"] : "#cccccc",
  ...alignCenterSx,
  [theme.breakpoints.up("sm")]: {},
}));

const DateName = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  color: active ? "white" : "black",
  fontWeight: 650,
  fontSize: 17,
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
}));

const DateHelperText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  color: active ? "white" : "black",
  fontWeight: 550,
  fontSize: 14,
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));
