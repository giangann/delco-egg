import { Box, Menu, Stack, Typography, styled } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { MouseEvent, useState } from "react";
import { CONFIG } from "../../shared/constants/common";
import { IcBaselineArrowDropDown } from "../../shared/icons/Icon";

export interface IDateRange {
  startDate: Dayjs;
  endDate: Dayjs;
}
type CustomDateRangePickerProps = {
  onChange: (newValue: IDateRange) => void;
  dateRange: IDateRange;
  isActive?: boolean;
};

const attributeName = "data-date-range-type";

export const CustomDateRangePicker = ({
  onChange,
  dateRange,
  isActive = true,
}: CustomDateRangePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openStart = Boolean(anchorEl);

  const openDatePicker = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onDateChange = (newValue: Dayjs) => {
    // check if data-* attr 'start-date' or 'end-date'
    if (anchorEl?.getAttribute(attributeName) === "start-date") {
      onChange({ ...dateRange, startDate: newValue });
    }
    if (anchorEl?.getAttribute(attributeName) === "end-date") {
      let newStartDate = dateRange.startDate;
      if (dateRange.startDate > newValue) {
        newStartDate = newValue;
      }
      onChange({ ...dateRange, endDate: newValue, startDate: newStartDate });
    }

    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{ opacity: isActive ? 1 : 0.7 }}
      direction={"row"}
      alignItems={"center"}
      spacing={1}
    >
      <Box
        component={"div"}
        sx={{ cursor: "pointer" }}
        data-date-range-type="start-date"
        onClick={isActive ? openDatePicker : () => {}}
      >
        <TextDate>
          {dayjs(dateRange.startDate).format(CONFIG.VIEWR_DATE_FORMAT)}
        </TextDate>
      </Box>

      <div>{" -> "}</div>

      <Box
        component={"div"}
        sx={{ cursor: "pointer" }}
        data-date-range-type="end-date"
        onClick={isActive ? openDatePicker : () => {}}
      >
        <TextDate>
          {dayjs(dateRange.endDate).format(CONFIG.VIEWR_DATE_FORMAT)}
        </TextDate>{" "}
      </Box>
      {isActive && <IcBaselineArrowDropDown />}
      <Menu
        open={openStart}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <DateCalendar
          value={
            anchorEl?.getAttribute(attributeName) === "start-date"
              ? dayjs(dateRange.startDate)
              : dayjs(dateRange.endDate)
          }
          onChange={onDateChange}
          maxDate={
            anchorEl?.getAttribute(attributeName) === "start-date"
              ? dayjs(dateRange.endDate)
              : dayjs()
          }
        />
      </Menu>
    </Stack>
  );
};

const TextDate = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  fontWeight: 500,
  letterSpacing: "1px",
  [theme.breakpoints.up("sm")]: {},
}));
