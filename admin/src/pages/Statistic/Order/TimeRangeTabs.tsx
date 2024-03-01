import { Box } from "@mui/material";
import { CustomTab } from "../../../components/Tab/CustomTab";
import { CustomTabs } from "../../../components/Tab/CustomTabs";
import { commonDateWithMySqlFormat } from "../../../shared/helper";

export const TimeRangeTabs = ({
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
              startDate: commonDateWithMySqlFormat().today,
              endDate: commonDateWithMySqlFormat().today,
            }}
            label="H.nay"
          />
          <CustomTab
            tabIndex={1}
            value={{
              startDate: commonDateWithMySqlFormat().threeDaysBefore,
              endDate: commonDateWithMySqlFormat().today,
            }}
            label="3 ngày"
          />
          <CustomTab
            tabIndex={2}
            value={{
              startDate: commonDateWithMySqlFormat().sevenDaysBefore,
              endDate: commonDateWithMySqlFormat().today,
            }}
            label="1 tuần"
          />
          <CustomTab
            tabIndex={3}
            value={{
              startDate: commonDateWithMySqlFormat().dateOneMonthBefore,
              endDate: commonDateWithMySqlFormat().today,
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
