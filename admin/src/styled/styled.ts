import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { GREEN } from "./color";
import { OPACITY_TO_HEX } from "../shared/constants/common";

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
  marginTop: 4,
  marginLeft: 4,
  color: "red",
  [theme.breakpoints.up("sm")]: {
    fontSize: 15,
  },
}));

export const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
    fontWeight: 600,
  },
}));
export const BoxFieldName = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
}));

export const BoxFieldValue = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  fontWeight: 500,
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
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
export const RowStatisticStyled = styled(Box)(({ theme }) => ({
  paddingLeft: "2px",
  paddingTop: "4px",
  paddingBottom: "4px",
  cursor: "pointer",
  borderBottom: `1px solid #000000${OPACITY_TO_HEX["10"]}`,
  [theme.breakpoints.up("sm")]: {},
}));

// Stack
export const StackAlignCenterJustifySpaceBetween = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
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
