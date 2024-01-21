import { Box, Button, Container, Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../components/Input/CustomInput";
import { IUserCreate } from "../../shared/types/user";
import { postApi } from "../../lib/utils/fetch/fetchRequest";

export const UserCreateForm = () => {
  const { register, handleSubmit } = useForm<IUserCreate>();

  const onSumbit = async (value: IUserCreate) => {
    const res = await postApi("user/create", value);
    console.log(res);
  };
  return (
    <Container>
      <Box component={"form"} onSubmit={handleSubmit(onSumbit)}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <CustomInput
              {...register("username")}
              placeholder="Tên đăng nhập"
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <CustomInput {...register("password")} placeholder="Mật khẩu" />
          </Grid>

          <Grid item xs={6} sm={3}>
            <CustomInput {...register("fullname")} placeholder="Họ tên" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomInput
              {...register("phone_number")}
              placeholder="Só điện thoại"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomInput
              {...register("company_name")}
              placeholder="Tên công ty"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomInput {...register("note")} placeholder="Ghi chú" />
          </Grid>
        </Grid>
        <Button sx={{ float: "right" }} type="submit" variant="contained">
          Tạo
        </Button>
      </Box>
    </Container>
  );
};
