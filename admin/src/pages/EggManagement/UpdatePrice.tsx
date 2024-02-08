import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputElement } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import { getApi, postApi } from "../../lib/utils/fetch/fetchRequest";
import { IcBaselineDeleteForever } from "../../shared/icons/Icon";
import { IEggPriceQty } from "../../shared/types/egg-price-qty";
import { GREEN } from "../../styled/color";
import { BoxFlexEnd, alignCenterSx } from "../../styled/styled";

export const UpdatePrice = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [focusRow, setFocusRow] = useState(-1);
  const [count, setCount] = useState(-1);
  const [rerender, setRerender] = useState(0);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isDirty },
  } = useForm<IEggPriceQty[]>();

  const actionGrid = {
    xs: 1.5,
  };
  const grid = {
    xs: (12 - actionGrid.xs) / 4,
  };

  const onSubmit = async (data: IEggPriceQty[]) => {
    try {
      const res = await postApi("egg-price-qty/update-day-price", data);
      if (res.success) {
        setRerender(rerender + 1);
        toast.success("Cap nhat thanh cong!");
        setOpenDialog(false);
      } else {
        throw res.error;
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    async function fetchEggPriceQty() {
      const res = await getApi("egg-price-qty");

      for (let i = 0; i < res.data.length; i++) {
        setValue(res.data[i].egg_id.toString(), res.data[i]);
      }

      setCount(count + 1);
    }
    fetchEggPriceQty();
  }, [rerender]);
  return (
    <Page title="Cập nhật giá trứng">
      <GridContainerCustom container sx={{ backgroundColor: GREEN["500"] }}>
        <GridHeaderCustom item xs={grid.xs}>
          <HeaderText>Loại</HeaderText>
        </GridHeaderCustom>
        <GridHeaderCustom item xs={grid.xs}>
          <HeaderText>Giá Delco</HeaderText>
        </GridHeaderCustom>
        <GridHeaderCustom item xs={grid.xs}>
          <HeaderText>Giá CP</HeaderText>
        </GridHeaderCustom>
        <GridHeaderCustom item xs={grid.xs}>
          <HeaderText>Giá Thị trường</HeaderText>
        </GridHeaderCustom>
        <GridHeaderCustom item xs={actionGrid.xs} />
      </GridContainerCustom>

      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(getValues()).map((key, index) => {
          let rowKey = Number(key);
          let isFocus = index === focusRow;
          return (
            // <>{JSON.stringify(priceQtyItem)}</>
            <GridContainerCustom container>
              <GridCustom item xs={grid.xs}>
                <TypeNameText
                  fontSize={isFocus ? "20px !important" : "unset"}
                  fontWeight={isFocus ? "900 !important" : "unset"}
                  color={isFocus ? "red" : "black"}
                  sx={{ transition: "all 0.25s" }}
                >
                  {getValues(`${rowKey}`).egg.type_name}
                </TypeNameText>
              </GridCustom>
              <GridCustom item xs={grid.xs}>
                <InputElement
                  onFocus={() => setFocusRow(index)}
                  sx={{ textAlign: "center" }}
                  {...register(`${rowKey}.price_1`)}
                />
              </GridCustom>
              <GridCustom item xs={grid.xs}>
                <InputElement
                  onFocus={() => setFocusRow(index)}
                  sx={{ textAlign: "center" }}
                  {...register(`${rowKey}.price_2`)}
                />
              </GridCustom>
              <GridCustom item xs={grid.xs}>
                <InputElement
                  onFocus={() => setFocusRow(index)}
                  sx={{ textAlign: "center" }}
                  {...register(`${rowKey}.price_3`)}
                />
              </GridCustom>
              <GridCustom item xs={actionGrid.xs}>
                <Box sx={{ ...alignCenterSx, height: "100%" }}>
                  <IconButton
                    sx={{
                      padding: 0.2,
                    }}
                  >
                    <IcBaselineDeleteForever color={red["700"]} />
                  </IconButton>
                </Box>
              </GridCustom>
            </GridContainerCustom>
          );
        })}
        <LastBox>
          <Button
            onClick={() => {}}
            sx={{
              padding: 0.25,
              marginY: 1,
            }}
            variant="outlined"
          >
            +
          </Button>
        </LastBox>

        <BoxFlexEnd mt={2}>
          <Button
            disabled={!isDirty || isSubmitting}
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={14} />
            }
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Cập nhật
          </Button>
        </BoxFlexEnd>

        <Dialog
          disablePortal={true}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <Box p={3}>
            <TitleText mb={2}> Xác nhận </TitleText>
            <Typography>
              Xác nhận cập nhật giá trứng cho ngày hôm nay
            </Typography>
            <BoxFlexEnd mt={4}>
              <Button onClick={() => setOpenDialog(false)} variant="outlined">
                Hủy
              </Button>
              <Button
                sx={{ marginLeft: 2 }}
                disabled={!isDirty || isSubmitting}
                endIcon={
                  isSubmitting && <CircularProgress color="inherit" size={14} />
                }
                variant="contained"
                type="submit"
              >
                Cập nhật
              </Button>
            </BoxFlexEnd>
          </Box>
        </Dialog>
      </form>
    </Page>
  );
};

const TypeNameText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 700,
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
  ...alignCenterSx,
  borderRight: `1px solid ${GREEN["500"]}`,
  borderTop: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));

const GridContainerCustom = styled(Grid)(({ theme }) => ({
  borderLeft: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));
const LastBox = styled(Box)(({ theme }) => ({
  ...alignCenterSx,
  border: `1px solid ${GREEN["500"]}`,
  [theme.breakpoints.up("sm")]: {},
}));
