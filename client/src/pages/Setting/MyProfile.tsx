import CircularProgress from "@mui/material/CircularProgress";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  useForm,
  UseFormReturn,
  Resolver,
} from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import {
  IUserChangePassword,
  IUserProfile,
  TUserUpdate,
} from "../../shared/types/user";
import { TextButton } from "../../styled/styled";
import { fakeDelay } from "../../shared/helpers/function";
import useAuth from "../../hooks/useAuth";
import { BaseInput } from "../../components/Input/BaseInput";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordInput } from "../../components/Input/PasswordInput";
import { putApi } from "../../lib/utils/fetch/fetchRequest";

const changePasswordSchema = object({
  current_password: string().required("Mật khẩu hiện tại không được bỏ trống"),
  new_password: string().required("Mật khẩu mới không được bỏ trống"),
});
const updateUserInfoSchema = object({
  fullname: string().required("Họ tên không được bỏ trống"),
  phone_number: string().required("Số điện thoại không được bỏ trống"),
});
// user name, account, other information, change password
export const MyProfile = () => {
  return (
    <Page title="Thông tin của tôi">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Account />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserInfo />
        </Grid>
      </Grid>
    </Page>
  );
};

const Account = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();
  const toogleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
  } = useForm<IUserChangePassword>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onChangePassword = async (value: IUserChangePassword) => {
    console.log(value);
    const changePwRespond = await putApi("me/change-password", value);
    if (changePwRespond.success) {
      toast.success("Cập nhật thành công");
      setIsEdit(false);
    } else {
      setError("current_password", changePwRespond.override.current_password);
    }
  };
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit(onChangePassword)}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BoxTitle>{"Tài khoản"}</BoxTitle>

          {isEdit ? (
            <Button onClick={toogleIsEdit} variant="outlined">
              <TextButton>Hủy</TextButton>
            </Button>
          ) : (
            <EditButton
              color="warning"
              onClick={toogleIsEdit}
              variant="outlined"
            >
              <TextButton>Đổi mật khẩu</TextButton>
            </EditButton>
          )}
        </Stack>
        <BoxContent>
          <BoxFieldName>Tên đăng nhập</BoxFieldName>
          <BoxFieldValue>{user?.username}</BoxFieldValue>
        </BoxContent>

        <BoxContent>
          {isEdit ? (
            <>
              <PasswordInput
                label="Mật khẩu hiện tại"
                required
                err={errors.current_password?.message}
                {...register("current_password")}
              />

              <PasswordInput
                label="Mật khẩu mới"
                required
                err={errors.new_password?.message}
                {...register("new_password")}
              />
            </>
          ) : (
            <>
              <BoxFieldName>Mật khẩu</BoxFieldName>
              <BoxFieldValue>{"**********"}</BoxFieldValue>
            </>
          )}
        </BoxContent>
        {isEdit && (
          <Button
            sx={{ mt: 1 }}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={14} />
            }
          >
            <TextButton>Cập nhật</TextButton>
          </Button>
        )}
      </form>
    </Paper>
  );
};

const UserInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();
  const toogleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const {
    register,
    getValues,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<TUserUpdate>({
    defaultValues: {
      fullname: user?.fullname,
      phone_number: user?.phone_number,
      company_name: user?.company_name,
    },
    resolver: yupResolver(updateUserInfoSchema) as Resolver<TUserUpdate, any>,
  });

  const onUpdateUserInfo = async (info: TUserUpdate) => {
    await fakeDelay(1);
    console.log(info);

    setIsEdit(false);
  };
  return (
    <Paper
      onSubmit={handleSubmit(onUpdateUserInfo)}
      component={"form"}
      elevation={4}
      sx={{ padding: 2 }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <BoxTitle>{"Thông tin khác"}</BoxTitle>
        {isEdit ? (
          <Button onClick={toogleIsEdit} variant="outlined">
            <TextButton>Hủy</TextButton>
          </Button>
        ) : (
          <EditButton color="warning" onClick={toogleIsEdit} variant="outlined">
            <TextButton>Sửa</TextButton>
          </EditButton>
        )}
      </Stack>
      <BoxContent>
        <BoxFieldName>Số điện thoại</BoxFieldName>
        {isEdit ? (
          <BaseInput
            err={errors.phone_number?.message}
            {...register("phone_number")}
          />
        ) : (
          <BoxFieldValue>{getValues("phone_number")}</BoxFieldValue>
        )}{" "}
      </BoxContent>

      <BoxContent>
        <BoxFieldName>Họ tên</BoxFieldName>
        {isEdit ? (
          <BaseInput err={errors.fullname?.message} {...register("fullname")} />
        ) : (
          <BoxFieldValue>{getValues("fullname")}</BoxFieldValue>
        )}{" "}
      </BoxContent>
      <BoxContent>
        <BoxFieldName>Công ty</BoxFieldName>
        {isEdit ? (
          <BaseInput
            err={errors.company_name?.message}
            {...register("company_name")}
          />
        ) : (
          <BoxFieldValue>
            {getValues("company_name") || "<chưa đặt>"}
          </BoxFieldValue>
        )}
      </BoxContent>

      {isEdit && (
        <Button
          sx={{ mt: 1 }}
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          endIcon={
            isSubmitting && <CircularProgress color="inherit" size={14} />
          }
        >
          <TextButton>Cập nhật</TextButton>
        </Button>
      )}
    </Paper>
  );
};

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {},
}));
const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldName = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  opacity: 0.9,

  [theme.breakpoints.up("sm")]: {},
}));

const EditButton = styled(Button)(({ theme }) => ({
  // color:grey['300'],
  [theme.breakpoints.up("sm")]: {},
}));
