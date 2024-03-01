import { useState } from "react";
import { CustomTab } from "../../../components/Tab/CustomTab";
import { CustomTabs } from "../../../components/Tab/CustomTabs";
import { Box, Typography } from "@mui/material";
import { alignCenterSx } from "../../../styled/styled";

export const TestCustomTabs = () => {
  const [startDate, setStartDate] = useState("24/02/2024");

  const onChange = (newValue: any) => {
    setStartDate(newValue);
  };
  return (
    <Box my={1}>
      <CustomTabs onChange={onChange}>
        <>
          <CustomTab tabIndex={0} value={"25/02/2024"} label="3 ngày" />
          <CustomTab tabIndex={1} value={"26/02/2024"} label="1 tuần" />
          <CustomTab tabIndex={2} value={"27/02/2024"} label="1 tháng" />
        </>
      </CustomTabs>

      <Box sx={{ ...alignCenterSx, my:2 }}>
        <Typography>{startDate}</Typography>
      </Box>
    </Box>
  );
};
