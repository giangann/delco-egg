import {
  Box,
  Button,
  CircularProgress,
  Grid
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import { postApi } from "../../lib/utils/fetch/fetchRequest";
import { IEggInfo } from "../../shared/types/egg";
import { InputLabelText, TextButton } from "../../styled/styled";

export const CreateNewType = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IEggInfo>();

  const onSubmit = async (data: IEggInfo) => {
    const res = await postApi("egg", data);

    console.log(res);
    toast.success("created success");

    // reset form
    reset();
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
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          endIcon={
            isSubmitting && <CircularProgress color="inherit" size={14} />
          }
        >
          <TextButton>Tạo</TextButton>
        </Button>{" "}
      </Box>
    </Page>
  );
};
