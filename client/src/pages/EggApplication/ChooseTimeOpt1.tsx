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

export const ChooseTimeOpt1 = () => {
  const today = new Date();
  const { isMobile } = useDevice();
  const [day, setDay] = React.useState<Dayjs | null>(dayjs(today));
  const [time, setTime] = React.useState<Dayjs | null>(dayjs(today));

  return (
    <Container>
      <Paper elevation={isMobile ? 0 : 1} sx={{ padding: { xs: 0, sm: 2 } }}>
        <TitleText mt={4}>Chọn thời gian lấy</TitleText>

        <Box mt={4}>
          {isMobile ? (
            <Stack>
              <Box>
                <LabelText>Chọn ngày</LabelText>
                <LabelText>{toReadableDate(day)}</LabelText>
                <DateCalendar
                  view="day"
                  value={day}
                  onChange={(newValue) => setDay(newValue)}
                />
              </Box>
              <Box>
                <Box>
                  <LabelText>Chọn giờ</LabelText>
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
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
const TitleText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 24,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
