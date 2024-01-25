import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogProps,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Page } from "../../components/Page/Page";
import { getApi, putApi } from "../../lib/utils/fetch/fetchRequest";
import { IEggUpdate } from "../../shared/types/egg";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../components/Input/CustomInput";
import { BoxFlexEnd, TextButton } from "../../styled/styled";
import { toast } from "react-toastify";

const DEFAULT_ID = -1;
export const ListType = () => {
  const [count, setCount] = useState(0);
  const [itemId, setItemId] = useState(DEFAULT_ID);
  const [listEggType, setListEggType] = useState<IEggUpdate[]>();
  const handleOpenDialog = (itemId: number) => {
    setItemId(itemId);
  };

  const handleCloseDialog = () => {
    setItemId(DEFAULT_ID);
  };
  useEffect(() => {
    async function getListEggType() {
      const res = await getApi("egg");
      if (res.success) setListEggType(res.data);
    }
    getListEggType();
  }, [count]);
  return (
    <Page title="Danh sách các loại trứng">
      {listEggType?.length && (
        <>
          <Grid container rowSpacing={2} columnSpacing={3}>
            {listEggType?.map((eggInfo, index) => (
              <Grid item xs={12} sm={4}>
                <EggTypeItem
                  handleOpenDialog={handleOpenDialog}
                  itemIndex={index}
                  {...eggInfo}
                />
              </Grid>
            ))}
          </Grid>
          {itemId >= 0 && (
            // @ts-ignore
            <EditDialog
              open={itemId >= 0}
              onClose={handleCloseDialog}
              refetch={() => setCount(count + 1)}
              {...listEggType[itemId]}
            />
          )}
        </>
      )}
    </Page>
  );
};

type EggItemProps = {
  type_name: string;
  weight: string;
  itemIndex: number;
  handleOpenDialog: (itemId: number) => void;
};
const EggTypeItem = ({
  type_name,
  weight,
  itemIndex,
  handleOpenDialog,
}: EggItemProps) => {
  return (
    <Paper elevation={4} sx={{ p: 4, position: "relative" }}>
      <Box position={"relative"}>
        <Stack spacing={1.5}>
          <Grid container>
            <Grid item xs={4}>
              <BoxFieldName>Tên loại: </BoxFieldName>
            </Grid>

            <Grid item>
              <BoxFieldValue>{type_name}</BoxFieldValue>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <BoxFieldName> Khối lượng: </BoxFieldName>
            </Grid>

            <Grid item>
              <BoxFieldValue>{weight}</BoxFieldValue>
            </Grid>
          </Grid>
        </Stack>

        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <EditButton
            onClick={() => handleOpenDialog(itemIndex)}
            variant="outlined"
          >
            Sửa
          </EditButton>
        </Box>
      </Box>
    </Paper>
  );
};

const EditDialog = ({
  id,
  type_name,
  weight,
  open,
  onClose,
  refetch,
}: IEggUpdate & DialogProps & { refetch: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IEggUpdate>({
    defaultValues: {
      id: id,
      type_name: type_name,
      weight: weight,
    },
  });

  const onSubmit = async (data: IEggUpdate) => {
    const res = await putApi(`egg/:${data.id}`, data);

    if (res.success) toast.success("update success");
    else toast.error(res.error.message);

    // @ts-ignore
    onClose();
    refetch();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={4} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <InputLabelText>Nhập tên loại</InputLabelText>
            <CustomInput
              {...register("type_name")}
              placeholder="VD: Mix 1, Mix 2 ... "
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabelText>Nhập khối lượng</InputLabelText>
            <CustomInput
              {...register("weight")}
              placeholder="VD: 26kg - 30kg ..."
            />
          </Grid>
        </Grid>
        <BoxFlexEnd mt={3}>
          {/* @ts-ignore */}
          <Button onClick={() => onClose()} variant="outlined">
            <TextButton>Hủy</TextButton>
          </Button>
          <Button
            sx={{ ml: 1 }}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={14} />
            }
          >
            <TextButton>Lưu</TextButton>
          </Button>
        </BoxFlexEnd>
      </Box>
    </Dialog>
  );
};

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
  textTransform: "none",
  [theme.breakpoints.up("sm")]: {},
}));
const InputLabelText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  marginBottom: 4,
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));
