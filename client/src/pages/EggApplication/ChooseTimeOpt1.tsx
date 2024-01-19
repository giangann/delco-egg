import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  DateCalendar,
  MultiSectionDigitalClock,
  StaticDatePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useDevice } from "../../hooks/useDevice";
import { PageTitleText } from "../../styled/styled";

export const ChooseTimeOpt1 = () => {
  const today = new Date();
  const { isMobile } = useDevice();
  const [day, setDay] = React.useState<Dayjs | null>(dayjs(today));
  const [time, setTime] = React.useState<Dayjs | null>(dayjs(today));

  return (
    <Container>
      <Paper elevation={isMobile ? 0 : 1} sx={{ padding: { xs: 0, sm: 2 } }}>
        <PageTitleText mt={3}>Chọn thời gian lấy</PageTitleText>

        <Box mt={3}>
          {isMobile ? (
            <Stack>
              <Box>
                <LabelText mb={2}>1. Chọn ngày</LabelText>
                <LabelValueText>
                  Đang chọn: {toReadableDate(day)}
                </LabelValueText>
                <DateCalendar
                  view="day"
                  value={day}
                  onChange={(newValue) => setDay(newValue)}
                />
              </Box>
              <Box mb={5}>
                <Box>
                  <LabelText>2. Chọn giờ</LabelText>
                  {/* <LabelText>{toReadableTime(time)}</LabelText> */}
                </Box>
                <MultiSectionDigitalClock
                  sx={{ justifyContent: "center" }}
                  value={time}
                  onChange={setTime}
                  defaultValue={dayjs(today)}
                  ampm={false}
                />
              </Box>
            </Stack>
          ) : (
            <>
              <StaticDatePicker
                onChange={setDay}
                value={day}
                defaultValue={dayjs(today)}
                // defaultValue={dayjs("2022-04-17")}
              />
              <StaticTimePicker
                value={time}
                defaultValue={dayjs(today)}
                onChange={setTime}
              />
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

function toReadableDate(date: Dayjs | null) {
  let dd = date?.get("date");
  let mm = (date?.get("month") as number) + 1;
  let yy = date?.get("year");

  let readableDate = `${dd}/${mm}/${yy}`;
  return readableDate;
}
// function toReadableTime(time: Dayjs | null) {
//   let hour = time?.get("hour");
//   let minute = time?.get("minute");

//   let readableTime = `${hour}:${minute}`;
//   return readableTime;
// }

const LabelText = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  fontWeight: 650,
  fontSize: 17,
  [theme.breakpoints.up("sm")]: {},
}));

const LabelValueText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 500,
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {},
}));
