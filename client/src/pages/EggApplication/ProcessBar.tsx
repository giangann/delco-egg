import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IcRoundKeyboardBackspace,
  IcSharpScheduleSend,
} from "../../shared/icons/Icon";
import { GREEN } from "../../styled/color";
import { FormContext, MAX_STEP } from "./CreateForm";
export const ProcessBar = ({
  currStep,
  setOpenConfirm,
}: {
  currStep: number;
  setOpenConfirm: any;
}) => {
  const form = useContext(FormContext).form;
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePrev = () => {
    if (currStep > 1) {
      let prevStep = currStep - 1;
      searchParams.set("step", JSON.stringify(prevStep));
      setSearchParams(searchParams);
    }
  };

  const handleNext = async () => {
    let nextStep = currStep + 1;
    searchParams.set("step", JSON.stringify(nextStep));

    let acceptNext: boolean = false;
    let message = "";

    if (currStep < MAX_STEP) {
      if (currStep === 1) {
        const step1ok = await form?.trigger("items");
        if (step1ok && form?.getValues("items")) acceptNext = true;
        else message = "Hãy chọn loại trứng, chọn đủ số lượng và mức giá";
      }

      if (currStep === 2) {
        const step2ok = await form?.trigger("time");
        if (step2ok) acceptNext = true;
        else message = "Hãy chọn đủ ngày và giờ lấy";
      }
    }

    if (acceptNext) {
      setSearchParams(searchParams);
    } else {
      toast.error(message);
    }
  };

  return createPortal(
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: GREEN["500"],
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {currStep > 1 ? (
          <ButtonStep
            startIcon={<IcRoundKeyboardBackspace color="white" />}
            disabled={!(currStep > 1)}
            onClick={handlePrev}
          >
            <TextButton>{"Trước"}</TextButton>
          </ButtonStep>
        ) : (
          <div />
        )}
        <Box
          position={"absolute"}
          sx={{
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <TextStep> {`${currStep}/${MAX_STEP}`}</TextStep>
        </Box>

        {currStep < MAX_STEP && (
          <ButtonStep
            endIcon={
              <IcRoundKeyboardBackspace
                color="white"
                style={{ transform: "rotate(180deg)" }}
              />
            }
            disabled={!(currStep < MAX_STEP)}
            onClick={handleNext}
          >
            <TextButton>{"Tiếp"}</TextButton>
          </ButtonStep>
        )}

        {currStep == MAX_STEP && (
          <ButtonStep
            sx={{ borderRadius: "unset" }}
            color="warning"
            variant="contained"
            endIcon={<IcSharpScheduleSend color="white" />}
            onClick={() => setOpenConfirm(true)}
          >
            <TextButton>{"Gửi"}</TextButton>
          </ButtonStep>
        )}
      </Stack>
    </Box>,
    document.body
  );
};

const TextStep = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 550,
  [theme.breakpoints.up("sm")]: {},
}));

const TextButton = styled(Typography)(({ theme }) => ({
  color: "white",
  textTransform: "none",
  fontWeight: 600,
  [theme.breakpoints.up("sm")]: {},
}));
const ButtonStep = styled(Button)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up("sm")]: {},
}));
