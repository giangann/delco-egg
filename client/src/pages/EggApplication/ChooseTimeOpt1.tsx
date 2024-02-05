import { Box, Stack, Typography, styled } from "@mui/material";
import {
  DateCalendar,
  MultiSectionDigitalClock,
  StaticDatePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Page } from "../../components/Page/Page";
import { useDevice } from "../../hooks/useDevice";
import { UseFormReturn } from "react-hook-form";
import { IOrder } from "../../shared/types/order";

type Step2Props = UseFormReturn<IOrder>;

export const ChooseTimeOpt1 = ({ setValue, getValues }: Step2Props) => {
  const today = new Date();
  const { isMobile } = useDevice();
  const [day, setDay] = React.useState<Dayjs | null>(dayjs(today));
  const [time, setTime] = React.useState<Dayjs | null>(dayjs(today));

  return (
    <Page title="Chọn thời gian lấy">
      <Box mt={3}>
        {isMobile ? (
          <Stack>
            <Box>
              <LabelText mb={2}>1. Chọn ngày</LabelText>
              {/* <LabelValueText>Đang chọn: {toReadableDate(day)}</LabelValueText> */}
              <LabelValueText>
                Đang chọn: {day?.format("DD/MM/YYYY")}
              </LabelValueText>

              <DateCalendar
                view="day"
                value={day}
                onChange={(newValue) => {
                  setDay(newValue);
                  setValue("date", newValue.format("YYYY-MM-DD"));
                }}
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
                onChange={(newValue) => {
                  setTime(newValue),
                    setValue("time", newValue.format("HH:mm:ss"));
                }}
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
    </Page>
  );
};

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
