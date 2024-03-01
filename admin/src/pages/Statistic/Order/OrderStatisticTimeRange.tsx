import { Box, Menu, Stack, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { MouseEvent, useState } from "react";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import { IcBaselineArrowDropDown } from "../../../shared/icons/Icon";

export const OrderStatisticTimeRange = () => {
  const currTime = dayjs().format("DD/MM/YYYY");
  const [startTime, setStartTime] = useState(currTime);
  const [endTime, setEndTime] = useState(currTime);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  console.log(anchorEl);
  const openStart = Boolean(anchorEl);

  const openStartTime = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <BoxStatisticWithTimeRange
      title="Order theo ngày"
      chooseTimeElement={
        <Stack direction={"row"}>
          <Box
            component={"div"}
            sx={{ cursor: "pointer" }}
            onClick={openStartTime}
          >
            <Typography>{startTime}</Typography>
          </Box>
          <Menu
            open={openStart}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <DateCalendar
              onChange={(newValue: Date | null) => {
                setStartTime(dayjs(newValue).format("DD/MM/YYYY"));
                setAnchorEl(null);
              }}
            />
          </Menu>
          {"-"}

          <Box component={"div"}>
            <Typography>{endTime}</Typography>
          </Box>
          <IcBaselineArrowDropDown />
        </Stack>
      }
    >
      <Typography>Some thing</Typography>

      <Typography>Some thing</Typography>
      <Typography>Some thing</Typography>
    </BoxStatisticWithTimeRange>
  );
};
