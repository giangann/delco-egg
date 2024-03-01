import { Box, Menu, Stack, Typography, styled } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { MouseEvent, useState } from "react";
import { CONFIG } from "../../shared/constants/common";
import { dateMysqlToViewerFormat } from "../../shared/helper";
import { IcBaselineArrowDropDown } from "../../shared/icons/Icon";

export interface IDateRange {
  startDate: string | null;
  endDate: string | null;
}
type CustomDateRangePickerProps = {
  onChange: (newValue: IDateRange) => void;
  dateRange: IDateRange;
  isActive?: boolean;
};
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

  const onDateChange = (newValue: Date | string) => {
    let newDateValue = dayjs(newValue).format(CONFIG.MY_SQL_DATE_FORMAT);
    // check if data-* attr 'start-date' or 'end-date'
    let attributeName = "data-date-range-type";
    if (anchorEl?.getAttribute(attributeName) === "start-date") {
      onChange({ ...dateRange, startDate: newDateValue });
    }
    if (anchorEl?.getAttribute(attributeName) === "end-date") {
      onChange({ ...dateRange, endDate: newDateValue });
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
        <TextDate>{dateMysqlToViewerFormat(dateRange.startDate)}</TextDate>
      </Box>

      <div>{" -> "}</div>

      <Box
        component={"div"}
        sx={{ cursor: "pointer" }}
        data-date-range-type="end-date"
        onClick={isActive ? openDatePicker : () => {}}
      >
        <TextDate>{dateMysqlToViewerFormat(dateRange.endDate)}</TextDate>
      </Box>
      {isActive && <IcBaselineArrowDropDown />}
      <Menu
        open={openStart}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <DateCalendar onChange={onDateChange} maxDate={dayjs()} />
      </Menu>
    </Stack>
  );
};

const TextDate = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  fontWeight: 500,
  letterSpacing:'1px',
  [theme.breakpoints.up("sm")]: {},
}));
