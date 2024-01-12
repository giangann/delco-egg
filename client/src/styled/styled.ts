import { Box, styled } from "@mui/material";

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

export const alginCenterSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
