import { Box, styled } from "@mui/material";
import { BoxAbsoluteFullAlignCenter } from "../../styled/styled";
import { OPACITY_TO_HEX } from "../../shared/constants/common";

interface BoxWithLayerProps {
  children?: React.ReactNode;
  imgSrc: string;
}
export const BoxWithLayer = ({ children, imgSrc }: BoxWithLayerProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <img src={imgSrc} style={{ maxWidth: "100%" }} />
      <BoxAbsoluteFullAlignCenter>
        <BoxWhiteBlur>{children}</BoxWhiteBlur>
      </BoxAbsoluteFullAlignCenter>
    </Box>
  );
};

const BoxWhiteBlur = styled(Box)({
  backgroundColor: `#ffffff${OPACITY_TO_HEX["80"]}`,
  width: "90%",
  height: "90%",
});
