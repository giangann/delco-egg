import { Box, Button, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { GREEN } from "./color";

// Text
export const PageTitleText = styled(Typography)(({ theme }) => ({
  color: GREEN["500"],
  fontSize: 28,
  fontWeight: 900,
  textAlign: "center",
  lineHeight: 1.25,
  [theme.breakpoints.up("sm")]: {},
}));
export const TextButton = styled(Typography)(({ theme }) => ({
  textTransform: "none",
  [theme.breakpoints.up("sm")]: {},
}));
export const InputLabelText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  marginBottom: 4,
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));
export const InputErrorText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 13,
  marginTop:4,
  marginLeft:4,
  color: "red",
  [theme.breakpoints.up("sm")]: {
    fontSize: 15,
  },
}));


// Box
export const BoxAbsoluteFull = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});
export const BoxAbsoluteFullAlignTopRight = styled(BoxAbsoluteFull)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
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

export const BoxFlexEnd = styled(FlexDefaultBox)({
  justifyContent: "flex-end",
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
export const FakeATag = styled(Link)({
  textDecoration: "underline",
  color: "#0000EE",
});

// style for sx, not component
export const alignCenterSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
