import { Typography, styled } from "@mui/material";
import { forwardRef, useContext } from "react";
import { TabContext } from "./CustomTabs";

type TabProps = {
  tabIndex: number;
  value: any;
  label?: string;
};

export const CustomTab = forwardRef(
  (props: TabProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { value, tabIndex, label } = props;
    const { activeTabIndex, getMap, onChange, onTabClick } =
      useContext(TabContext);
    let isActive = activeTabIndex === tabIndex;

    return (
      <TabStyled
        active={isActive}
        onClick={() => {
          onTabClick(tabIndex);
          onChange(value);
        }}
        tabIndex={tabIndex}
        ref={(node) => {
          if (node) {
            const map = getMap();
            map.set(tabIndex, node);
          }
        }}
      >
        <TabText active={isActive}>{label || `Tab ${tabIndex + 1}`}</TabText>
      </TabStyled>
    );
  }
);

const TabStyled = styled("div", {
  shouldForwardProp: (props) => props !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  cursor:'pointer',
  opacity: 1,
  padding: "3px 10px",
  [theme.breakpoints.up("sm")]: {},
}));

const TabText = styled(Typography, {
  shouldForwardProp: (props) => props !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  fontSize:18,
  fontWeight: active ? 550 : 450,
  opacity: active ? 1 : 0.8,
  [theme.breakpoints.up("sm")]: {},
}));
