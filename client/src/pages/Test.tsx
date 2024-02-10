import { Box, Stack, Typography, styled } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { BaseInput } from "../components/Input/BaseInput";
import { OPACITY_TO_HEX } from "../shared/constants/common";
import { GREEN } from "../styled/color";

type User = {
  fullname: string;
  phone_number: string;
  school: School[];
};

type School = {
  school_name: string;
  years_of_study: number;
};

export const Test = () => {
  const { register, setValue, getValues } = useForm<User>();
  const [params, setParams] = useSearchParams();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.name as keyof User, event.target.value);
    console.log(getValues());
    const { school, fullname, phone_number } = getValues();

    params.set("school", JSON.stringify(school));
    params.set("fullname", fullname);
    params.set("phone_number", phone_number);

    setParams(params);
  };

  useEffect(() => {
    const school = JSON.parse(params.get("school") as string);
    const fullname = params.get("fullname");
    const phone_number = params.get("phone_number");

    setValue("school", school);
    setValue("fullname", fullname as string);
    setValue("phone_number", phone_number as string);
  }, []);
  return (
    <BoxWrapper>
      <Stack spacing={3} component={"form"}>
        <BaseInput placeholder="Fullname" {...register("fullname")} />
        <BaseInput placeholder="Phone number" {...register("phone_number")} />

        {[1, 2, 3, 4].map((item, index) => (
          <Stack spacing={1}>
            <Typography>{`School ${index}`}</Typography>
            <BaseInput
              placeholder="Fullname"
              {...register(`school.${index}.school_name`)}
              onBlur={onChange}
            />
            <BaseInput
              placeholder="Years of study"
              {...register(`school.${index}.years_of_study`)}
              onBlur={onChange}
            />
          </Stack>
        ))}
      </Stack>
    </BoxWrapper>
  );
};

const BoxWrapper = styled(Box)({
  backgroundColor: `${GREEN["500"]}${OPACITY_TO_HEX["20"]}`,
  width: "50%",
  padding: 32,
});
