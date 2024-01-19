// import { CreateFormOpt1 } from "./CreateFormOpt1";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateFormOpt2 } from "./CreateFormOpt2";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { ChooseTime } from "./ChooseTime";
import React, { useEffect } from "react";
import { Confirm } from "./Confirm";

const MAX_STEP = 3;

export const CreateForm = () => {
  const params = useSearchParams()[0];
  const currStep = Number(params.get("step"));
  const navigate = useNavigate();
  const Steps: Record<string, React.ReactNode> = {
    1: <CreateFormOpt2 />,
    2: <ChooseTime />,
    3: <Confirm />,
  };

  useEffect(() => {
    if (!currStep) {
      const searchParams = new URLSearchParams({ step: `${1}` });
      navigate({ search: searchParams.toString() });
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Box sx={{ position: "relative" }}> */}
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

  return (
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
    </Box>
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
