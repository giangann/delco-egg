import { useState } from "react";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import {
  CustomDateRangePicker,
  IDateRange,
} from "../../../components/DateRange/CustomDateRangePicker";
import { TimeRangeTabs } from "./TimeRangeTabs";
import { commonDateWithMySqlFormat } from "../../../shared/helper";
import { Box, Typography } from "@mui/material";
import { alignCenterSx } from "../../../styled/styled";

export const OrderStatisticTimePanel = () => {
  const defaultDateRange = {
    startDate: commonDateWithMySqlFormat().today,
    endDate: commonDateWithMySqlFormat().today,
  };
  const [dateRange, setDateRange] = useState<IDateRange>(defaultDateRange);

  const [isChooseDateRangeActive, setIsChooseDateRangeActive] = useState(false);
  const onChange = (newValue: IDateRange) => {
    if (newValue.endDate && newValue.startDate) {
      setIsChooseDateRangeActive(false);
      setDateRange(newValue);
    } else {
      setDateRange(defaultDateRange);
      setIsChooseDateRangeActive(true);
    }
  };

  const onDateRangeChange = (newValue: IDateRange) => {
    setDateRange(newValue);
  };

  return (
    <BoxStatisticWithTimeRange
      title="Order theo mốc"
      chooseTimeElement={<TimeRangeTabs onChange={onChange} />}
    >
      <>
        <CustomDateRangePicker
          onChange={onDateRangeChange}
          dateRange={dateRange}
          isActive={isChooseDateRangeActive}
        />

        <Box sx={{ ...alignCenterSx, my: 4 }}>
          <Typography> some things </Typography>
        </Box>
      </>
    </BoxStatisticWithTimeRange>
  );
};
