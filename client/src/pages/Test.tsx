import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import { array, number, object, string } from "yup";
import { BaseInput } from "../../../admin/src/components/Input/BaseInput";
import { OPACITY_TO_HEX } from "../shared/constants/common";
import { GREEN } from "../styled/color";

type IUserTest = {
  username: string;
  info: {
    phone: string;
    address: {
      address_name: string;
      distance: number;
    }[];
  };
};

const addressSchema = array().of(
  object({
    address_name: string().required("ten dia chi k dc bo trong"),
    distance: number()
      .required("khoang cach k dc bo trong")
      .typeError("Phải là số và không được bỏ trống"),
  })
);
const infoSchema = object({
  phone: string().required("So dien thoai k dc bo trong"),
  address: addressSchema,
});
const testSchema = object({
  username: string().required("Tên k đc bỏ trống"),
  info: infoSchema,
});

export const Test = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    getFieldState,
    trigger,
  } = useForm<IUserTest>({
    resolver: yupResolver(testSchema) as Resolver<IUserTest, any>,
  });
  const onSubmit = (value: IUserTest) => {
    console.log("value", value);
    console.log("errors", errors);
  };

  const forceValidate = async () => {
    const triggerInfoRes = await trigger("info");
    const triggerUserRes = await trigger("username");

    console.log("triggerInfoRes", triggerInfoRes);
    console.log("triggerUserRes", triggerUserRes);
    console.log("isValid", isValid);

    const fieldState = getFieldState("info");
    console.log("fieldState", fieldState);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "50%",
        padding: 3,
        backgroundColor: `${GREEN["500"]}${OPACITY_TO_HEX["20"]}`,
      }}
    >
      <Stack spacing={2}>
        <BaseInput
          required
          label="User name"
          {...register("username")}
          placeholder="user.username"
          err={errors.username?.message}
        />
        <BaseInput
          {...register("info.phone")}
          placeholder="user.info.phone"
          err={errors.info?.phone?.message}
        />
        <BaseInput
          {...register(`info.address.${0}.address_name`)}
          placeholder="`info.address.${0}.address_name`"
          err={errors.info?.address?.[0]?.address_name?.message}
        />
        <BaseInput
          {...register(`info.address.${0}.distance`)}
          placeholder="`info.address.${0}.distance`"
          err={errors.info?.address?.[0]?.distance?.message}
          type="number"
        />{" "}
        <BaseInput
          {...register(`info.address.${1}.address_name`)}
          placeholder="`info.address.${1}.address_name`"
          err={errors.info?.address?.[1]?.address_name?.message}
        />{" "}
        <BaseInput
          {...register(`info.address.${1}.distance`)}
          type="number"
          placeholder="`info.address.${1}.distance`"
          err={errors.info?.address?.[1]?.distance?.message}
        />
        <Typography>
          {errors.info?.address?.[0]?.address_name?.message}
        </Typography>
        <Button onClick={forceValidate} variant="outlined">
          Fake check valid
        </Button>
        <Button
          onClick={() => onSubmit(getValues())}
          variant="contained"
          type="submit"
        >
          submit
        </Button>
      </Stack>
    </Box>
  );
};
