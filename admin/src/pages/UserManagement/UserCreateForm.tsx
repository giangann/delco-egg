import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormHelperText, Grid, Stack, Switch } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { BaseInput } from "../../components/Input/BaseInput";
import { Page } from "../../components/Page/Page";
import { useDevice } from "../../hooks/useDevice";
import { postApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { MaterialSymbolsArrowCircleLeftOutline } from "../../shared/icons/Icon";
import { IUserCreate } from "../../shared/types/user";
import { BoxFlexEnd, ButtonResponsive } from "../../styled/styled";

const newUserSchema = object({
  username: string().required("Không được bỏ trống"),
  password: string().required("Không được bỏ trống"),
  phone_number: string().required("Không được bỏ trống"),
  fullname: string().required("Không được bỏ trống"),
});
export const UserCreateForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IUserCreate>({
    defaultValues: {
      password: "12345678",
    },
    resolver: yupResolver(newUserSchema),
  });
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [useDefaultPW, setUseDefaultPW] = useState(true);

  const onSumbit = async (value: IUserCreate) => {
    const res = await postApi("user/create", value);
    if (res.success) toast.success("Tạo mới thành công");
    else toast.error(res.error.message);
  };
  const onDefaultPWChange = () => {
    setUseDefaultPW(!useDefaultPW);
    resetField("password");
  };
  return (
    <Page title="Tạo người dùng mới">
      <Box component={"form"} onSubmit={handleSubmit(onSumbit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <BaseInput
              {...register("username")}
              required
              placeholder="Nhập tên đăng nhập"
              label="Tên đăng nhập"
              err={errors.username?.message}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <BaseInput
              disabled={useDefaultPW}
              {...register("password")}
              placeholder="Mật khẩu"
              label="Mật khẩu"
              err={errors.password?.message}
            />
            <Stack direction={"row"} alignItems={"center"}>
              <Switch checked={useDefaultPW} onChange={onDefaultPWChange} />
              <FormHelperText sx={{ fontSize: { xs: 13, sm: 15 } }}>
                dùng mật khẩu mặc định
              </FormHelperText>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3}>
            <BaseInput
              required
              {...register("fullname")}
              placeholder="Họ tên"
              label="Họ tên"
              err={errors.fullname?.message}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BaseInput
              required
              {...register("phone_number")}
              placeholder="Só điện thoại"
              label="Só điện thoại"
              err={errors.phone_number?.message}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BaseInput
              {...register("company_name")}
              placeholder="Tên công ty"
              label="Tên công ty"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <BaseInput
              {...register("note")}
              placeholder="Ghi chú"
              label="Ghi chú"
            />
          </Grid>
        </Grid>
        <BoxFlexEnd sx={{ marginTop: { xs: 2, sm: 1 } }}>
          <ButtonResponsive
            onClick={() => {
              navigate(SCREEN_PATHS.MANAGE.USER.LIST);
            }}
            variant="outlined"
            startIcon={
              <MaterialSymbolsArrowCircleLeftOutline
                style={{ fontSize: isMobile ? 16 : 24 }}
              />
            }
          >
            Quay lại
          </ButtonResponsive>
          <ButtonResponsive
            sx={{ ml: { xs: 1, sm: 2 } }}
            type="submit"
            variant="contained"
          >
            Tạo
          </ButtonResponsive>
        </BoxFlexEnd>
      </Box>
    </Page>
  );
};
