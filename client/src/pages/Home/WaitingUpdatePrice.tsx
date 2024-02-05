import { Box, Typography } from "@mui/material";

export const WaitingUpdatePrice = () => {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography textAlign={"center"}>
        {" "}
        ----- Đang đợi cập nhật giá cho hôm nay, chờ chút nhé -------
      </Typography>
    </Box>
  );
};
