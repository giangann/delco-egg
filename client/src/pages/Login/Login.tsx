import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CustomInput } from "../../components/Input/CustomInput";
import { useDevice } from "../../hooks/useDevice";
import { postApi } from "../../lib/utils/fetch/fetchRequest";

interface ILogin {
  username: string;
  password: string;
}
export const Login = () => {
  const { isMobile } = useDevice();

  const handleLogin = async (value: ILogin) => {
    console.log("trying to login", value);

    const res = await postApi("test/post", value);
    console.log(res);
  };

  const { register, handleSubmit } = useForm<ILogin>();

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
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={2} alignItems={"center"}>
              <CustomInput
                {...register("username")}
                required
                placeholder="Tên đăng nhập"
              />
              <CustomInput
                {...register("password")}
                required
                placeholder="Mật khẩu"
              />
              <Button type="submit" sx={{ width: "50%" }} variant="contained">
                Submit
              </Button>
              <Link to="#">
                <Typography variant="caption">Quên mật khẩu?</Typography>
              </Link>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
