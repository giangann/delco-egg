import { CustomTab } from "../../components/Tab/CustomTab";
import { CustomTabs } from "../../components/Tab/CustomTabs";
import { ORDER_STATUS, ORDER_STATUS_LABEL } from "../../shared/constants/orderStatus";

export const StatusTabs = ({
  onChange,
}: {
  onChange: (newValue: number, tabIndex?: number) => void;
}) => {
  return (
    <CustomTabs onChange={onChange}>
      <CustomTab
        tabIndex={0}
        value={ORDER_STATUS.WAITING_APPROVAL}
        label={ORDER_STATUS_LABEL.WAITING_APPROVAL}
      />
      <CustomTab
        tabIndex={1}
        value={ORDER_STATUS.ACCEPTED}
        label={ORDER_STATUS_LABEL.ACCEPTED}
      />{" "}
      <CustomTab
        tabIndex={2}
        value={ORDER_STATUS.REJECTED}
        label={ORDER_STATUS_LABEL.REJECTED}
      />{" "}
      <CustomTab
        tabIndex={3}
        value={ORDER_STATUS.SUCCESS}
        label={ORDER_STATUS_LABEL.SUCCESS}
      />{" "}
      <CustomTab
        tabIndex={4}
        value={ORDER_STATUS.CANCELED}
        label={ORDER_STATUS_LABEL.CANCELED}
      />
    </CustomTabs>
  );
};
