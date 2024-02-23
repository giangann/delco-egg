import { Box, Stack, Typography, styled } from "@mui/material";

type BoxAnnotateProps = {
  color: string;
  fieldName: string;
};
export const BoxAnnotate = ({ color, fieldName }: BoxAnnotateProps) => {
  return (
    <Stack direction={'row'} alignItems={"center"} spacing={0.5}>
      <BoxColor bgColor={color} />
      <Typography>{fieldName}</Typography>
    </Stack>
  );
};
const BoxColor = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  backgroundColor: bgColor,
  width: "8px",
  height: "12px",
}));
