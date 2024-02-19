import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { BaseInput } from "../../components/Input/BaseInput";
import useAuth from "../../hooks/useAuth";
import { useDevice } from "../../hooks/useDevice";
import { IUserLogin } from "../../shared/types/user";
import { InputErrorText, alignCenterSx } from "../../styled/styled";
import { toast } from "react-toastify";

const loginSchema = object({
  username: string().required("Tên đăng nhập không được bỏ trống"),
  password: string().required("Mật khẩu không được bỏ trống"),
});

export const Login = () => {
  const { isMobile } = useDevice();
  const { login } = useAuth();
  const [serverErr, setServerErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPW, setShowPW] = useState(false);
  const handleLogin = async (credentials: IUserLogin) => {
    setServerErr(null);
    const res = await login(credentials);

    if (res.success) {
      navigate("/");
      toast.success("Đăng nhập thành công");
    } else {
      setServerErr(res.error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          ...alignCenterSx,
        }}
      >
        <Paper elevation={isMobile ? 0 : 4} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" mb={3}>
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={2} alignItems={"center"}>
              <BaseInput
                {...register("username")}
                sx={{ width: { xs: 300, sm: 400 } }}
                placeholder="Tên đăng nhập"
                err={errors.username?.message}
              />
              <BaseInput
                {...register("password")}
                placeholder="Mật khẩu"
                type={showPW ? "text" : "password"}
                endIcon={
                  <IconButton onClick={() => setShowPW(!showPW)}>
                    {showPW ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                err={errors.password?.message}
                style={{ paddingRight: 48 }}
              />
              {serverErr && <InputErrorText>{serverErr}</InputErrorText>}
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
