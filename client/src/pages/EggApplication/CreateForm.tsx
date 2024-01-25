// import { CreateFormOpt1 } from "./CreateFormOpt1";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IOrder } from "../../shared/types/order";
import { ChooseTimeOpt1 } from "./ChooseTimeOpt1";
import { Confirm } from "./Confirm";
import { CreateFormOpt2 } from "./CreateFormOpt2";

const MAX_STEP = 3;

export const CreateForm = () => {
  const params = useSearchParams()[0];
  const currStep = Number(params.get("step"));
  const navigate = useNavigate();

  const { register, control, ...useFormReturns } = useForm<IOrder>();

  const Steps: Record<string, React.ReactNode> = {
    1: (
      <CreateFormOpt2
        register={register}
        control={control}
        {...useFormReturns}
      />
    ),
    2: (
      <ChooseTimeOpt1
        register={register}
        control={control}
        {...useFormReturns}
      />
    ),
    3: <Confirm register={register} control={control} {...useFormReturns} />,
  };

  useEffect(() => {
    if (!currStep) {
      const searchParams = new URLSearchParams({ step: `${1}` });
      navigate({ search: searchParams.toString() });
    }
  }, []);

  return (
    <React.Fragment>
      {Steps[currStep]}

      {/* Button navbar area */}
      <CustomNavbar currStep={currStep} />
    </React.Fragment>
  );
};

const CustomNavbar = ({ currStep }: { currStep: number }) => {
  const navigate = useNavigate();
  const handlePrev = () => {
    if (currStep > 1) {
      let prevStep = currStep - 1;
      const searchParams = new URLSearchParams({ step: `${prevStep}` });
      navigate({ search: searchParams.toString() });
    }
  };

  const handleNext = () => {
    if (currStep < MAX_STEP) {
      let nextStep = currStep + 1;
      const searchParams = new URLSearchParams({ step: `${nextStep}` });
      navigate({ search: searchParams.toString() });
    }
  };

  return createPortal(
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <ButtonStep disabled={!(currStep > 1)} onClick={handlePrev}>
          <TextButton>{"< Prev"}</TextButton>
        </ButtonStep>
        <TextStep> {`${currStep}/${MAX_STEP}`}</TextStep>

        <ButtonStep disabled={!(currStep < MAX_STEP)} onClick={handleNext}>
          <TextButton>{"Next >"}</TextButton>
        </ButtonStep>
      </Stack>
    </Box>,
    document.body
  );
};

const TextStep = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {},
}));

const TextButton = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {},
}));
const ButtonStep = styled(Button)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up("sm")]: {},
}));
