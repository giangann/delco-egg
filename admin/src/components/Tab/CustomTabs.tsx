import { Box, Stack, styled } from "@mui/material";
import { Ref, createContext, useEffect, useRef, useState } from "react";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { GREEN } from "../../styled/color";

type CustomTabsProps = {
  onChange: (newValue: any) => void;
  children: React.ReactNode;
};
type TTabContext = {
  tabsRef: Ref<Map<number, HTMLDivElement> | null>;
  getMap: () => Map<number, HTMLDivElement>;
  activeTabIndex: number;
  onTabClick: (newTabIndex: number) => void;
  onChange: (newValue: any, newTabIndex?: number) => void;
};
export const TabContext = createContext<TTabContext>({
  tabsRef: null,
  getMap: () => new Map(),
  activeTabIndex: 0,
  onTabClick: () => {},
  onChange: () => {},
});

export const CustomTabs = ({ onChange, children }: CustomTabsProps) => {
  const tabsRef = useRef<Map<number, HTMLDivElement> | null>(null);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [lineWidth, setLineWidth] = useState<number>(0);
  const [lineOffsetX, setLineOffsetX] = useState<number>(0);

  const getMap = () => {
    if (!tabsRef.current) {
      tabsRef.current = new Map();
    }
    return tabsRef.current;
  };

  // trigger onClick function with tabIndex of clicked tab (active style, translateX for line)
  const onTabClick = (newTabIndex: number) => {
    setActiveTabIndex(newTabIndex);

    const newTab = getTabByTabIndex(newTabIndex);
    setLineWidth(newTab?.offsetWidth as number);
    setLineOffsetX(getOffsetXByTabIndex(newTabIndex));
  };

  // get target tab (by tabindex)
  const getTabByTabIndex = (tabIndex: number) => {
    const map = getMap();
    const node = map.get(tabIndex);
    return node;
  };

  // helper function for get x-position of clicked tab
  const getOffsetXByTabIndex = (tabIndex: number) => {
    let offsetX = 0;
    for (let i = 0; i < tabIndex; i++) {
      let tab = getTabByTabIndex(i);
      if (tab) {
        offsetX += tab.offsetWidth;
      }
    }
    return offsetX;
  };

  useEffect(() => {
    onTabClick(activeTabIndex);
  }, []);

  return (
    <TabContext.Provider
      value={{
        tabsRef,
        getMap,
        onChange,
        onTabClick,
        activeTabIndex,
      }}
    >
      <Stack>
        <ScrollableBox>
          <Stack direction={"row"}>{children}</Stack>
          <StyledDecoration lineOffsetX={lineOffsetX} lineWidth={lineWidth} />
        </ScrollableBox>
        <StyledLine />
      </Stack>
    </TabContext.Provider>
  );
};

const StyledLine = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "1px",
  backgroundColor: `#000000${OPACITY_TO_HEX["10"]}`,
  [theme.breakpoints.up("sm")]: {},
}));

const StyledDecoration = styled(Box, {
  shouldForwardProp: (prop) => prop !== "lineOffsetX" && prop !== "lineWidth",
})<{ lineOffsetX: number; lineWidth: number }>(
  ({ theme, lineOffsetX, lineWidth }) => ({
    transition: "all 0.5s",
    transform: `translateX(${lineOffsetX}px)`,
    width: `${lineWidth}px`,
    height: "2px",
    backgroundColor: `${GREEN["500"]}`,
    [theme.breakpoints.up("sm")]: {},
  })
);

const ScrollableBox = styled(Box)(({ theme }) => ({
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle:'none',
  scrollbarWidth:'none',
  [theme.breakpoints.up("sm")]: {},
}));
