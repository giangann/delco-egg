import { Box, Typography, styled } from "@mui/material";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import { timeToHHMMNN } from "../../shared/helpers/function";
import { InputErrorText } from "../../styled/styled";
import { FormContext } from "./CreateForm";
import { DateOptions } from "./DateOptions";

export const Step2 = () => {
  const form = useContext(FormContext).form;
  const startTime = dayjs().set("hour", 10).startOf("hour");
  const currTime = dayjs().startOf("hour");
  const [searchParams, setSearchParams] = useSearchParams();

  const updateDateTimeParams = () => {
    const date = form?.getValues("date");
    const time = form?.getValues("time");

    if (date) {
      searchParams.set("date", date as string);
    }
    if (time) {
      searchParams.set("time", time as string);
    }
    setSearchParams(searchParams);
  };

  // caculate default date time from urlSearchParams
  const time = useContext(FormContext).saveOrder?.time;

  let defaultTimeObject = timeToHHMMNN(time);

  let defaulTime = defaultTimeObject
    ? dayjs()
        .set("hour", defaultTimeObject.hour)
        .set("minute", defaultTimeObject.minute)
    : undefined;

  return (
    <Page title="Chọn thời gian lấy">
      <Box mt={3}>
        <Box>
          <LabelText mb={2}>1. Chọn ngày</LabelText>
          <DateOptions updateDateTimeParams={updateDateTimeParams} />
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
              updateDateTimeParams();
            }}
            defaultValue={
              defaulTime || (currTime > startTime ? currTime : startTime)
            }
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
