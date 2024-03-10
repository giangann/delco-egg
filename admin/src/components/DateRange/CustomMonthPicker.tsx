import { Box, Menu, Stack, Typography, styled } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { MouseEvent, useState } from "react";
import { IcBaselineArrowDropDown } from "../../shared/icons/Icon";
import { DateView } from "@mui/x-date-pickers";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";

type CustomDatePickerProps = {
  onChange: (newValue: Dayjs) => void;
  date: Dayjs | null;
  isActive?: boolean;
};
export const CustomMonthPicker = ({
  onChange,
  date,
  isActive = true,
}: CustomDatePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openStart = Boolean(anchorEl);

  const openDatePicker = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMonthChange = (
    newValue: Dayjs,
    _selectionState?: PickerSelectionState,
    _selectedView?: DateView
  ) => {
    onChange(newValue);
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{ opacity: isActive ? 1 : 0.7 }}
      direction={"row"}
      alignItems={"center"}
      spacing={1}
    >
      {date ? (
        <>
          <Box
            component={"div"}
            sx={{ cursor: "pointer" }}
            onClick={isActive ? openDatePicker : () => {}}
          >
            <TextDate>{`T.${dayjs(date).get("month") + 1} / ${dayjs(date).get(
              "year"
            )}`}</TextDate>
          </Box>

          {isActive && <IcBaselineArrowDropDown />}
          <Menu
            open={openStart}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <DateCalendar
              views={["year", "month"]}
              openTo="month"
              value={date}
              onChange={onMonthChange}
              maxDate={dayjs()}
              minDate={dayjs().subtract(dayjs().get("year") - 2018, "year")}
            />
          </Menu>
        </>
      ) : (
        "---"
      )}
    </Stack>
  );
};

const TextDate = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  fontWeight: 500,
  letterSpacing: "1px",
  [theme.breakpoints.up("sm")]: {},
}));
