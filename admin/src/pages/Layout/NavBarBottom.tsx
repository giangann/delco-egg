import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import { Paper, styled } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { GREEN } from "../../styled/color";
import HomeIcon from "@mui/icons-material/Home";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { SLUG } from "../../shared/constants/slug";
import { useNavigate } from "react-router-dom";
export default function NavBarBottom() {
  const [value, setValue] = React.useState("/");
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ width: "100vw", backgroundColor: GREEN["500"], paddingY: 1 }}
        value={value}
        showLabels
        onChange={handleChange}
      >
        <StyledActionBtn
          label="Tổng quan"
          value="/"
          icon={<HomeIcon style={{ color: "white" }} />}
        />
        <StyledActionBtn
          label="Quản lý"
          value={SLUG.MANAGE}
          icon={<ListAltIcon style={{ color: "white" }} />}
        />
        <StyledActionBtn
          label="Thống kê"
          value={SLUG.STATISTIC}
          icon={<QueryStatsIcon style={{ color: "white" }} />}
        />
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
