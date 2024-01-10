import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { CustomInput } from "../../components/Input/CustomInput";
import { Link } from "react-router-dom";
import { useDevice } from "../../hooks/useDevice";

export const Login = () => {
  const { isMobile } = useDevice();

  const handleLogin = async () => {
    console.log("trying to login");
  };
  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={isMobile ? 0 : 2} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" mb={3}>
            Đăng nhập
          </Typography>
          <Stack spacing={2} alignItems={"center"}>
            <CustomInput placeholder="Tên đăng nhập" />
            <CustomInput placeholder="Mật khẩu" />
            <Button sx={{ width: "50%" }} variant="contained">
              Submit
            </Button>
            <Link to="#">
              <Typography variant="caption">Quên mật khẩu?</Typography>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};
