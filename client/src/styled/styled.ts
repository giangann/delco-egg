import { Box, Button, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { GREEN } from "./color";

// TEXT
export const PageTitleText = styled(Typography)(({ theme }) => ({
  color: GREEN["500"],
  fontSize: 28,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
export const TextButton = styled(Typography)(({ theme }) => ({
  textTransform: "none",
  [theme.breakpoints.up("sm")]: {},
}));
export const BoxHeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 650,
  fontSize: 17,
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
}));

// BOX
export const BoxAbsoluteFull = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});
export const BoxAbsoluteFullAlignCenter = styled(BoxAbsoluteFull)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const BoxAbsoluteFullAlignRight = styled(BoxAbsoluteFull)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});
export const AlignCenterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const FlexDefaultBox = styled(Box)({
  display: "flex",
});

// LINK
export const LinkCustom = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});
export const ATagCustom = styled("a")({
  textDecoration: "none",
  color: "inherit",
});

// BUTTON
export const ButtonResponsive = styled(Button)(({ theme }) => ({
  fontSize: 14,
  padding: "4px 14px",
  textTransform: "none",
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
    padding: "6px 16px",
  },
}));

// STYLE FOR SX, NOT COMPONENT
export const alignCenterSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
