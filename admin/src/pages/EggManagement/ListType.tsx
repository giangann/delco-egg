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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { BaseInput } from "../../components/Input/BaseInput";
import { Page } from "../../components/Page/Page";
import { deleteApi, getApi, putApi } from "../../lib/utils/fetch/fetchRequest";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { IEggUpdate } from "../../shared/types/egg";
import { BoxFlexEnd, TextButton } from "../../styled/styled";

const DEFAULT_ID = -1;
export const ListType = () => {
  const [count, setCount] = useState(0);
  const [itemId, setItemId] = useState(DEFAULT_ID);
  const [delItemId, setDelItemId] = useState(DEFAULT_ID);

  const [listEggType, setListEggType] = useState<IEggUpdate[]>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const handleOpenEditDialog = (itemId: number) => {
    setItemId(itemId);
  };
  const handleCloseEditDialog = () => {
    setItemId(DEFAULT_ID);
  };

  const handleOpenDeleteDialog = (itemId: number) => {
    setDelItemId(itemId);
  };
  const handleCloseDeleteDialog = () => {
    setDelItemId(DEFAULT_ID);
  };

  const onDeleteType = async () => {
    setIsSubmitting(true);
    const eggId = listEggType![delItemId].id;

    const res = await deleteApi(`egg/${eggId}`);

    if (res.success) toast.success("Xóa thành công");
    else toast.error(res.error.message);
    setIsSubmitting(false);
    handleCloseDeleteDialog();
    setCount(count + 1);
  };
  useEffect(() => {
    async function getListEggType() {
      const res = await getApi<IEggUpdate[]>("egg", { isDeleted: "0" });
      if (res.success) setListEggType(res.data);
    }
    getListEggType();
  }, [count]);
  return (
    <Page
      title="Danh sách các loại trứng"
      onCreate={() => navigate(SCREEN_PATHS.MANAGE.EGG.CREATE)}
    >
      {listEggType?.length && (
        <>
          <Grid container rowSpacing={2} columnSpacing={3}>
            {listEggType?.map((eggInfo, index) => (
              <Grid item xs={12} sm={4}>
                <EggTypeItem
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
                  handleOpenEditDialog={handleOpenEditDialog}
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
              onClose={handleCloseEditDialog}
              refetch={() => setCount(count + 1)}
              {...listEggType[itemId]}
            />
          )}

          {delItemId >= 0 && (
            // @ts-ignore
            <ConfirmDialog
              title="Xác nhận thao tác"
              content={`Bạn có muốn xóa "${listEggType![delItemId].type_name}"`}
              open={delItemId >= 0}
              onClose={handleCloseDeleteDialog}
              onAccept={onDeleteType}
              isSubmitting={isSubmitting}
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
  handleOpenEditDialog: (itemId: number) => void;
  handleOpenDeleteDialog: (itemId: number) => void;
};
const EggTypeItem = ({
  type_name,
  weight,
  itemIndex,
  handleOpenEditDialog,
  handleOpenDeleteDialog,
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
          <Stack spacing={0.5}>
            <ActionButton
              onClick={() => handleOpenEditDialog(itemIndex)}
              variant="outlined"
            >
              Sửa
            </ActionButton>
            <ActionButton
              color="error"
              onClick={() => handleOpenDeleteDialog(itemIndex)}
              variant="contained"
            >
              Xóa
            </ActionButton>
          </Stack>
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

    if (res.success) toast.success("Cập nhật thành công");
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
            <BaseInput
              {...register("type_name")}
              placeholder="VD: Mix 1, Mix 2 ... "
              label="Nhập tên loại"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <BaseInput
              {...register("weight")}
              placeholder="VD: 26kg - 30kg ..."
              label="Nhập khối lượng"
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
const ActionButton = styled(Button)(({ theme }) => ({
  padding: "3px 8px",
  textTransform: "none",
  [theme.breakpoints.up("sm")]: {},
}));
