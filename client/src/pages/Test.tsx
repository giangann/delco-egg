import { Box, Button, CircularProgress, Stack, styled } from "@mui/material";
import { BaseInput } from "../components/Input/BaseInput";
import { OPACITY_TO_HEX } from "../shared/constants/common";
import { GREEN } from "../styled/color";
import { useForm } from "react-hook-form";
import { IUserChangePassword, TUserUpdate } from "../shared/types/user";
import { fakeDelay } from "../shared/helpers/function";

export const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IUserChangePassword>();

  const onChangePassword = async (value: IUserChangePassword) => {
    await fakeDelay(1);
    console.log(value);
  };
  return (
    <BoxWrapper>
      <Stack
        spacing={3}
        component={"form"}
        onSubmit={handleSubmit(onChangePassword)}
      >
        <BaseInput
          label="Mật khẩu hiện tại"
          required
          placeholder="Fullname"
          {...register("current_password")}
        />
        <BaseInput
          label="Mật khẩu mới"
          required
          placeholder="Phone number"
          {...register("new_password")}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          endIcon={
            isSubmitting && <CircularProgress color="inherit" size={14} />
          }
        >
          Submit
        </Button>
      </Stack>
    </BoxWrapper>
  );
};

const BoxWrapper = styled(Box)({
  backgroundColor: `${GREEN["500"]}${OPACITY_TO_HEX["20"]}`,
  width: "50%",
  padding: 32,
});
