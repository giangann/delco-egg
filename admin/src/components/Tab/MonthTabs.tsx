import dayjs, { Dayjs } from "dayjs";
import { CustomTab } from "./CustomTab";
import { CustomTabs } from "./CustomTabs";

export const OTHER_MONTH_TAB_INDEX = 3;
export const MonthTabs = ({
  onChange,
}: {
  onChange: (newValue: Dayjs | null, tabIndex?: number) => void;
}) => {
  return (
    <CustomTabs onChange={onChange}>
      <CustomTab tabIndex={0} value={null} label="Tất cả" />
      <CustomTab tabIndex={1} value={dayjs()} label="Tháng này" />
      <CustomTab
        tabIndex={OTHER_MONTH_TAB_INDEX}
        value={dayjs().subtract(1, "month")}
        label="Khác"
      />
    </CustomTabs>
  );
};
