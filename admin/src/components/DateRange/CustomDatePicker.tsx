import { Box, Menu, Stack, Typography, styled } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { MouseEvent, useState } from "react";
import { CONFIG } from "../../shared/constants/common";
import { IcBaselineArrowDropDown } from "../../shared/icons/Icon";

type CustomDatePickerProps = {
  onChange: (newValue: Dayjs) => void;
  date: Dayjs;
  isActive?: boolean;
};
export const CustomDatePicker = ({
  onChange,
  date,
  isActive = true,
}: CustomDatePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openStart = Boolean(anchorEl);

  const openDatePicker = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onDateChange = (newValue: Dayjs) => {
    onChange(newValue)
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
        onClick={isActive ? openDatePicker : () => {}}
      >
        <TextDate>{dayjs(date).format(CONFIG.VIEWR_DATE_FORMAT)}</TextDate>
      </Box>

      {isActive && <IcBaselineArrowDropDown />}
      <Menu
        open={openStart}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <DateCalendar value={date} onChange={onDateChange} maxDate={dayjs()} />
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
