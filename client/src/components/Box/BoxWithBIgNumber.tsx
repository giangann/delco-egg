import { Box, Typography, styled } from "@mui/material";
import React from "react";

interface BoxWithBigNumberProps {
  displayNumber: string;
  pos: "left" | "right";
  children?: React.ReactNode;
}

export const BoxWithBigNumber = ({
  displayNumber,
  pos,
  children,
}: BoxWithBigNumberProps) => {
  return (
    <Box sx={{ border: "2px solid black", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: pos === "left" ? 100 : "unset",
          right: pos === "right" ? 100 : "unset",
        }}
      >
        <BigNumberStyled>{displayNumber}</BigNumberStyled>
      </Box>
      {children}
    </Box>
  );
};

const BigNumberStyled = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 100,
  fontWeight: 700,
}));
