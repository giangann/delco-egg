import { Box } from "@mui/material";
import dayjs from "dayjs";
import { CustomTab } from "../../components/Tab/CustomTab";
import { CustomTabs } from "../../components/Tab/CustomTabs";

export const DateTabs = ({
  onChange,
}: {
  onChange: (newValue: any) => void;
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
          <CustomTab tabIndex={2} value={null} label="Khác" />
        </>
      </CustomTabs>
    </Box>
  );
};
