import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { GREEN } from "./color";

// Text
export const PageTitleText = styled(Typography)(({ theme }) => ({
  color: GREEN["500"],
  fontSize: 28,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

// Box
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

export const AlignCenterBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const FlexDefaultBox = styled(Box)({
  display: "flex",
});

// Link
export const LinkCustom = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});
export const ATagCustom = styled("a")({
  textDecoration: "none",
  color: "inherit",
});

// style for sx, not component
export const alignCenterSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
