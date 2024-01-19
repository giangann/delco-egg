import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

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

export const LinkCustom = styled(Link)({
  textDecoration: "none",
});
export const ATagCustom = styled("a")({
  textDecoration: "none",
  color: "inherit",
});

export const alignCenterSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
