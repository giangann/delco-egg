import { Box, Typography } from "@mui/material";
import { BoxStatisticWithTimeRange } from "../../../components/Box/BoxStatisticWithTimeRange";
import { TestCustomTabs } from "./TestCustomTabs";
import { alignCenterSx } from "../../../styled/styled";

export const OrderStatisticTimePanel = () => {
  return (
    <BoxStatisticWithTimeRange
      title="Order theo mốc"
      chooseTimeElement={<TestCustomTabs />}
    >
      <Box sx={{ ...alignCenterSx }}></Box>
    </BoxStatisticWithTimeRange>
  );
};
