import { Box, FormHelperText, Grid, Stack, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import { useDevice } from "../../hooks/useDevice";
import { postApi } from "../../lib/utils/fetch/fetchRequest";
import { MaterialSymbolsArrowCircleLeftOutline } from "../../shared/icons/Icon";
import { IUserCreate } from "../../shared/types/user";
import {
  BoxFlexEnd,
  ButtonResponsive,
  InputLabelText,
} from "../../styled/styled";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { useState } from "react";

export const UserCreateForm = () => {
  const { register, handleSubmit, resetField } = useForm<IUserCreate>({
    defaultValues: {
      password: "12345678",
    },
  });
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [useDefaultPW, setUseDefaultPW] = useState(true);

  const onSumbit = async (value: IUserCreate) => {
    const res = await postApi("user/create", value);
    toast.success("sucess");
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
            <InputLabelText>Tên đăng nhập</InputLabelText>
            <CustomInput
              {...register("username")}
              required
              placeholder="Nhập tên đăng nhập"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <InputLabelText>Mật khẩu</InputLabelText>
            <CustomInput
              disabled={useDefaultPW}
              {...register("password")}
              placeholder="Mật khẩu"
            />
            <Stack direction={"row"} alignItems={"center"}>
              <Switch checked={useDefaultPW} onChange={onDefaultPWChange} />
              <FormHelperText sx={{ fontSize: { xs: 13, sm: 15 } }}>
                dùng mật khẩu mặc định
              </FormHelperText>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3}>
            <InputLabelText>Họ tên</InputLabelText>
            <CustomInput
              required
              {...register("fullname")}
              placeholder="Họ tên"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabelText>Só điện thoại</InputLabelText>
            <CustomInput
              required
              {...register("phone_number")}
              placeholder="Só điện thoại"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabelText>Tên công ty</InputLabelText>
            <CustomInput
              {...register("company_name")}
              placeholder="Tên công ty"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabelText>Ghi chú</InputLabelText>
            <CustomInput {...register("note")} placeholder="Ghi chú" />
          </Grid>
        </Grid>
        <BoxFlexEnd sx={{ marginTop: { xs: 2, sm: 1 } }}>
          <ButtonResponsive
            onClick={() => {
              navigate(SCREEN_PATHS.USER.LIST);
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
