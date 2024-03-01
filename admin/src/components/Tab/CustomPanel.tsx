import { useContext } from "react";
import { TabContext } from "./CustomTabs";

type CustomPanelProps = {
  tabIndex: number;
  children: React.ReactNode;
};
export const CustomPanel = ({ tabIndex, children }: CustomPanelProps) => {
  const { activeTabIndex } = useContext(TabContext);

  return <>{tabIndex === activeTabIndex && children}</>;
};
