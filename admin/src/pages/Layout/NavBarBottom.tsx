import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Paper, styled } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SLUG } from "../../shared/constants/slug";
import { GREEN } from "../../styled/color";
export default function NavBarBottom() {
  const [value, setValue] = React.useState("/");
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };
  const location = useLocation();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, width: "100vw" }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ width: "100%", backgroundColor: GREEN["500"], paddingY: 0.5 }}
        value={value}
        showLabels
        onChange={handleChange}
      >
        {items.map((item) => {
          let active = false;
          if (item.path === location.pathname && item.path === "/")
            active = true;
          if (item.path != "/" && location.pathname.includes(item.path))
            active = true;
          return (
            <StyledActionBtn
              label={item.text}
              value={item.path}
              icon={item.icon}
              sx={{
                opacity: active ? 1 : 0.8,
                fontWeight: active ? 700 : 500,
              }}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}

const StyledActionBtn = styled(BottomNavigationAction)(({ theme }) => ({
  span: {
    color: "white",
    fontSize: "18px !important",
    opacity: 1,
  },
  paddingLeft: 0,
  paddingRight: 0,

  [theme.breakpoints.up("sm")]: {},
}));

type NavItem = {
  path: string;
  text: string;
  icon: React.ReactNode;
};
const items: NavItem[] = [
  {
    path: "/",
    text: "Tổng quan",
    icon: <HomeIcon style={{ color: "white" }} />,
  },
  {
    path: SLUG.MANAGE,
    text: "Quản lý",
    icon: <ListAltIcon style={{ color: "white" }} />,
  },
  {
    path: SLUG.STATISTIC,
    text: "Thống kê",
    icon: <QueryStatsIcon style={{ color: "white" }} />,
  },
];
