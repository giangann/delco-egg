import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import { postApi } from "../../lib/utils/fetch/fetchRequest";
import { IEggInfo } from "../../shared/types/egg";
import {
  BoxFlexEnd,
  ButtonResponsive,
  InputLabelText,
  TextButton,
} from "../../styled/styled";
import { useNavigate } from "react-router-dom";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { MaterialSymbolsArrowCircleLeftOutline } from "../../shared/icons/Icon";
import { useDevice } from "../../hooks/useDevice";

export const CreateNewType = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IEggInfo>();
  const navigate = useNavigate();
  const { isMobile } = useDevice();

  const onSubmit = async (data: IEggInfo) => {
    const res = await postApi("egg", data);
    if (res.success) toast.success("created success");
    // reset form
    reset();
  };

  const onGoBack = () => {
    navigate(SCREEN_PATHS.EGG.LIST_TYPE);
  };
  return (
    <Page title="Tạo loại trứng mới">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <InputLabelText>Nhập tên loại</InputLabelText>
            <CustomInput
              {...register("type_name")}
              placeholder="VD: Mix 1, Mix 2 ... "
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputLabelText>Nhập khối lượng</InputLabelText>
            <CustomInput
              {...register("weight")}
              placeholder="VD: 26kg - 30kg ..."
            />
          </Grid>
        </Grid>

        <BoxFlexEnd sx={{ marginTop: { xs: 2, sm: 1 } }}>
          <ButtonResponsive
            onClick={onGoBack}
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
            disabled={isSubmitting}
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={14} />
            }
          >
            Tạo
          </ButtonResponsive>
        </BoxFlexEnd>
      </Box>
    </Page>
  );
};
