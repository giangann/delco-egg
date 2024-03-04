import { Box, Typography } from "@mui/material";
import { alignCenterSx } from "../../styled/styled";

export const NoOrderBox = () => {
  return (
    <Box sx={{ ...alignCenterSx, my: 3 }}>
      <Typography fontSize={18} textAlign={"center"} color={"red"}>
        {"Không có đơn hàng trong khoảng thời gian"}
      </Typography>
    </Box>
  );
};
