import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { InputElement } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import { CustomSelect, Option } from "../../components/Select/CustomSelect";
import { getApi, postApi } from "../../lib/utils/fetch/fetchRequest";
import { IcBaselineDeleteForever } from "../../shared/icons/Icon";
import { IEgg } from "../../shared/types/egg";
import { IEggQty } from "../../shared/types/egg-price-qty";
import { GREEN } from "../../styled/color";
import { BoxFlexEnd, alignCenterSx } from "../../styled/styled";
import dayjs from "dayjs";
import { CONFIG } from "../../shared/constants/common";

const actionGrid = {
  xs: 2,
};
const grid = {
  xs: (12 - actionGrid.xs) / 2,
};
export const UpdateQuantity = () => {
  const [count, setCount] = useState(-1);
  const [rerender, setRerender] = useState(0);
  const [listEgg, setListEgg] = useState<IEgg[]>([]);
  const [openConfirmUpdateDialog, setOpenConfirmUpdateDialog] = useState(false);

  const {
    setValue,
    control,
    handleSubmit,
    getValues,
    register,
    formState: { isSubmitting },
  } = useForm<{
    quantities: IEggQty[];
  }>();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "quantities",
  });

  const onSubmit = async (value: { quantities: IEggQty[] }) => {
    const data = {
      ...value,
      quantities: value.quantities
        .filter((el) => el.egg_id)
        .map((el) => {
          return {
            ...el,
            quantity: parseInt(el.quantity as unknown as string),
          };
        }),
      date: dayjs().format(CONFIG.MY_SQL_DATE_FORMAT),
    };
    const res = await postApi("egg-price-qty/update-day-quantity", data);
    if (res.success) {
      setRerender(rerender + 1);
      toast.success("Cập nhật thành công!");
    } else {
      toast.error(res.error.message);
    }
    setOpenConfirmUpdateDialog(false);
  };

  const onNewRow = async () => {
    const currList = getValues().quantities;
    const res = await getApi<IEgg[]>("egg", { isDeleted: "0" });
    if (res.success) {
      const ableListEgg = res.data.filter((egg: IEgg) =>
        currList.every((field) => field.egg_id !== egg.id)
      );
      setListEgg(ableListEgg);
    }
  };

  useEffect(() => {
    async function fetchEggPriceQty() {
      const res = await getApi<IEggQty[]>("egg-price-qty");
      if (res.success) setValue("quantities", res.data);

      // force rerender because use useForm to render value
      setCount(count + 1);
    }
    fetchEggPriceQty();
  }, [rerender]);

  return (
    <Page title="Cập nhật số lượng trứng">
      <Grid container spacing={{ xs: 5 }}>
        <Grid item xs={12} sm={4}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid container sx={{ backgroundColor: GREEN["500"] }}>
              <GridHeaderCustom item xs={grid.xs}>
                <HeaderText>Loại</HeaderText>
              </GridHeaderCustom>
              <GridHeaderCustom item xs={grid.xs}>
                <HeaderText>Số lượng</HeaderText>
              </GridHeaderCustom>
            </Grid>
            {fields.map((field, index) => (
              <QuantityRow
                field={field}
                index={index}
                listEgg={listEgg}
                getValues={getValues}
                setValue={setValue}
                register={register}
                key={field.egg_id}
                remove={remove}
              />
            ))}
            <LastBox justifyContent={"center"}>
              <Button
                onClick={() => {
                  onNewRow();
                  append({
                    egg: { id: 0, type_name: "" },
                    quantity: 0,
                    egg_id: 0,
                    date: "",
                  });
                }}
                sx={{ padding: 0.25, marginY: 1 }}
                variant="outlined"
              >
                +
              </Button>
            </LastBox>

            <BoxFlexEnd>
              <Button
                sx={{ marginTop: 2 }}
                disabled={isSubmitting}
                endIcon={isSubmitting && <CircularProgress size={14} />}
                variant="contained"
                onClick={() => setOpenConfirmUpdateDialog(true)}
              >
                Update
              </Button>
            </BoxFlexEnd>
            {openConfirmUpdateDialog && (
              <ConfirmDialog
                disablePortal
                isSubmitting={isSubmitting}
                title="Xác nhận cập nhật"
                content="Đã kiểm tra và cập nhật đúng số lượng trứng ?"
                open={openConfirmUpdateDialog}
                onClose={() => setOpenConfirmUpdateDialog(false)}
                insideFormEl={true}
              />
            )}
          </form>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              ...alignCenterSx,
              backgroundColor: "#cccccc",
              width: "100%",
              height: "100%",
              minHeight: 300,
            }}
          >
            <Typography variant="h6">Bieu do</Typography>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};

type QuantityRowProps = {
  field: IEggQty;
  setValue: any;
  index: string | number;
  listEgg: IEgg[];
  register: any;
  remove: any;
  getValues: any;
};
const QuantityRow = ({
  field,
  setValue,
  index,
  listEgg,
  register,
  remove,
}: QuantityRowProps) => {
  const [openDelDialog, setOpenDelDialog] = useState(false);
  return (
    <GridContainerCustom container>
      <GridCustom item xs={grid.xs}>
        {field.egg_id ? (
          <TypeNameText>{field.egg.type_name}</TypeNameText>
        ) : (
          <CustomSelect
            onChange={(event) => {
              // @ts-ignore
              let newVal = event?.target.value;
              setValue(`quantities.${index}.egg_id`, parseInt(newVal));
              setValue(
                `quantities.${index}.egg`,
                listEgg.filter((egg) => egg.id === parseInt(newVal))[0]
              );
            }}
          >
            {listEgg.map((egg, index) => (
              <Option
                key={index}
                value={egg.id}
                slotProps={{
                  root: { value: egg.id },
                }}
              >
                {egg.type_name}
              </Option>
            ))}
          </CustomSelect>
        )}
      </GridCustom>

      <GridCustom item xs={grid.xs}>
        <InputElement
          type="number"
          min={0}
          {...register(`quantities.${index}.quantity`)}
        />
      </GridCustom>
      <GridCustom item xs={actionGrid.xs}>
        <Box sx={{ ...alignCenterSx, height: "100%" }}>
          <IconButton
            sx={{
              padding: 0.2,
            }}
            onClick={() => setOpenDelDialog(true)}
          >
            <IcBaselineDeleteForever color={red["700"]} />
          </IconButton>
        </Box>
      </GridCustom>

      {openDelDialog && (
        <ConfirmDialog
          open={openDelDialog}
          title="Xác nhận xóa ?"
          content={`Xóa ${field.egg.type_name} khỏi danh sách`}
          onAccept={() => remove(index)}
          onClose={() => setOpenDelDialog(false)}
        />
      )}
    </GridContainerCustom>
  );
};

const LastBox = styled(Box)(({ theme }) => ({
  ...alignCenterSx,
  border: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));

const TypeNameText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  textAlign: "center",
  color: "white",
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
}));
const GridHeaderCustom = styled(Grid)(({ theme }) => ({
  ...alignCenterSx,
  padding: 8,
  borderRight: `1px solid ${GREEN["500"]}`,
  borderTop: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));
const GridCustom = styled(Grid)(({ theme }) => ({
  padding: 8,
  ...alignCenterSx,
  borderRight: `1px solid ${GREEN["500"]}`,
  borderTop: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));

const GridContainerCustom = styled(Grid)(({ theme }) => ({
  borderLeft: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));
