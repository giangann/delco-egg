import { Box } from "@mui/material";
import dayjs from "dayjs";
import { CustomTab } from "../../components/Tab/CustomTab";
import { CustomTabs } from "../../components/Tab/CustomTabs";

export const OTHER_DATE_TAB_INDEX = 2;

export const DateTabs = ({
  onChange,
}: {
  onChange: (newValue: any, newTabIndex?: number) => void;
}) => {
  return (
    <Box my={1}>
      <CustomTabs onChange={onChange}>
        <>
          <CustomTab tabIndex={0} value={dayjs()} label="H.nay" />
          <CustomTab
            tabIndex={1}
            value={dayjs().subtract(1, "day")}
            label="Hôm qua"
          />
          <CustomTab
            tabIndex={OTHER_DATE_TAB_INDEX}
            value={dayjs().subtract(2, "day")}
            label="Khác"
          />
        </>
      </CustomTabs>
    </Box>
  );
};
