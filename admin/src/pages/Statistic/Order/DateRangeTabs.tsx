import { Box } from "@mui/material";
import dayjs from "dayjs";
import { CustomTab } from "../../../components/Tab/CustomTab";
import { CustomTabs } from "../../../components/Tab/CustomTabs";

export const DateRangeTabs = ({
  onChange,
}: {
  onChange: (newValue: any) => void;
}) => {
  return (
    <Box my={1}>
      <CustomTabs onChange={onChange}>
        <>
          <CustomTab
            tabIndex={0}
            value={{
              startDate: dayjs(),
              endDate: dayjs(),
            }}
            label="H.nay"
          />
          <CustomTab
            tabIndex={1}
            value={{
              startDate: dayjs().subtract(1, "day"),
              endDate: dayjs(),
            }}
            label="H.qua"
          />
          <CustomTab
            tabIndex={2}
            value={{
              startDate: dayjs().subtract(1, "week"),
              endDate: dayjs(),
            }}
            label="1 tuần"
          />
          <CustomTab
            tabIndex={3}
            value={{
              startDate: dayjs().subtract(1, "month"),
              endDate: dayjs(),
            }}
            label="1 tháng"
          />
          <CustomTab
            tabIndex={4}
            value={{ startDate: null, endDate: null }}
            label="Khác"
          />
        </>
      </CustomTabs>
    </Box>
  );
};
