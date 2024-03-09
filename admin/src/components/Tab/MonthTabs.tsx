import dayjs from "dayjs";
import { CustomTab } from "./CustomTab";
import { CustomTabs } from "./CustomTabs";

export const MonthTabs = ({
  onChange,
}: {
  onChange: (newValue: any) => void;
}) => {
  return (
    <CustomTabs onChange={onChange}>
      <CustomTab
        tabIndex={0}
        value={{
          start_date: null,
          end_date: null,
        }}
        label="Tất cả"
      />
      <CustomTab
        tabIndex={1}
        value={{
          start_date: dayjs().startOf("month"),
          end_date: dayjs(),
        }}
        label="Tháng này"
      />
      <CustomTab
        tabIndex={2}
        value={{
          start_date: dayjs().subtract(1, "month").startOf("month"),
          end_date: dayjs().subtract(1, "month").endOf("month"),
        }}
        label="Tháng trước"
      />{" "}
      <CustomTab
        tabIndex={3}
        value={{
          start_date: dayjs().subtract(2, "month").startOf("month"),
          end_date: dayjs().subtract(2, "month").endOf("month"),
        }}
        label="2 tháng trc"
      />
      <CustomTab
        tabIndex={4}
        value={{ start_date: null, end_date: null }}
        label="Khác"
      />
    </CustomTabs>
  );
};
