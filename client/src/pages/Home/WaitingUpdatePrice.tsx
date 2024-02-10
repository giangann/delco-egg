import { Box, Container, Typography } from "@mui/material";
import { LinkCustom } from "../../styled/styled";

export const WaitingUpdatePrice = () => {
  return (
    <Container>
      <Box sx={{ px: 2, py: 4 }}>
        <Typography textAlign={"center"}>
          {" "}
          ----- Đang đợi cập nhật giá cho hôm nay, chờ chút nhé -------
        </Typography>
        <LinkCustom to={"/"}>
          <Typography textAlign={"center"}>{"<<< Về trang chủ"}</Typography>
        </LinkCustom>
      </Box>
    </Container>
  );
};
