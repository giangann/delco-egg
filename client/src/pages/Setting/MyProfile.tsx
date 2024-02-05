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
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import { IUserProfile } from "../../shared/types/user";
import { TextButton } from "../../styled/styled";

export function fakeDelay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
// user name, account, other information, change password
export const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, getValues } = useForm<IUserProfile>({
    defaultValues: {
      username: "user1@gmail.com",
      password: "12345678",
      fullname: "Nguyễn Văn A",
      phone_number: "0933305533",
    },
  });

  const onSubmit = async (callbackFn: () => void) => {
    setIsLoading(true);

    //
    const value = getValues();
    console.log(value);
    await fakeDelay(1.5);
    callbackFn();
    toast.success("edit success");
    //

    setIsLoading(false);
  };
  return (
    <Page title="Thông tin của tôi">
      <Grid component={"form"} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Account
            register={register}
            onEdit={onSubmit}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserInfo
            register={register}
            onEdit={onSubmit}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

type BoxProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  onEdit: (callbackFn: () => void) => void;
  isLoading: boolean;
};
const Account = ({ register, onEdit, isLoading }: BoxProps<IUserProfile>) => {
  const [isEdit, setIsEdit] = useState(false);
  const toogleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
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
          <EditButton color="warning" onClick={toogleIsEdit} variant="outlined">
            <TextButton>Sửa</TextButton>
          </EditButton>
        )}
      </Stack>
      <BoxContent>
        <BoxFieldName>Tên đăng nhập</BoxFieldName>
        {isEdit ? (
          <CustomInput {...register("username")} />
        ) : (
          <BoxFieldValue>{"user1@gmail.com"}</BoxFieldValue>
        )}
      </BoxContent>

      <BoxContent>
        <BoxFieldName>Mật khẩu</BoxFieldName>
        {isEdit ? (
          <CustomInput {...register("password")} />
        ) : (
          <BoxFieldValue>{"12345678"}</BoxFieldValue>
        )}
      </BoxContent>
      {isEdit && (
        <Button
          sx={{ mt: 1 }}
          onClick={() => onEdit(toogleIsEdit)}
          variant="contained"
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress color="inherit" size={14} />}
        >
          <TextButton>Cập nhật</TextButton>
        </Button>
      )}
    </Paper>
  );
};

const UserInfo = ({ register, onEdit, isLoading }: BoxProps<IUserProfile>) => {
  const [isEdit, setIsEdit] = useState(false);

  const toogleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
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
          <CustomInput {...register("phone_number")} />
        ) : (
          <BoxFieldValue>{"0933305533"}</BoxFieldValue>
        )}{" "}
      </BoxContent>

      <BoxContent>
        <BoxFieldName>Họ tên</BoxFieldName>
        {isEdit ? (
          <CustomInput {...register("fullname")} />
        ) : (
          <BoxFieldValue>{"Nguyễn Văn A"}</BoxFieldValue>
        )}{" "}
      </BoxContent>

      {isEdit && (
        <Button
          sx={{ mt: 1 }}
          onClick={() => onEdit(toogleIsEdit)}
          variant="contained"
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress color="inherit" size={14} />}
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
