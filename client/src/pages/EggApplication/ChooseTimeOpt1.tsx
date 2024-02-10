import { Box, Typography, styled } from "@mui/material";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext } from "react";
import { Page } from "../../components/Page/Page";
import { FormContext } from "./CreateForm";
import { DateOptions } from "./DateOptions";
import { InputErrorText } from "../../styled/styled";

export const ChooseTimeOpt1 = () => {
  const form = useContext(FormContext).form;
  const startTime = dayjs().set("hour", 10).startOf("hour");
  const currTime = dayjs().startOf("hour");

  return (
    <Page title="Chọn thời gian lấy">
      <Box mt={3}>
        <Box>
          <LabelText mb={2}>1. Chọn ngày</LabelText>
          <DateOptions />
        </Box>
        <Box mt={5}>
          <Box>
            <LabelText>2. Chọn giờ</LabelText>
            {form?.formState.errors.time?.message && (
              <InputErrorText>
                {form?.formState.errors.time?.message}
              </InputErrorText>
            )}
          </Box>
          <MultiSectionDigitalClock
            minTime={startTime}
            sx={{ justifyContent: "center" }}
            onChange={(newValue) => {
              form?.setValue("time", newValue.format("HH:mm:ss"));
            }}
            defaultValue={currTime > startTime ? currTime : startTime}
            ampm={false}
          />
        </Box>
      </Box>
    </Page>
  );
};

const LabelText = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  fontWeight: 650,
  fontSize: 17,
  [theme.breakpoints.up("sm")]: {},
}));
