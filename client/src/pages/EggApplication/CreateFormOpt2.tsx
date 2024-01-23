import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Box,
  Button,
  Fab,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CustomInput } from "../../components/Input/CustomInput";
import { Page } from "../../components/Page/Page";
import {
  Option as CustomOption,
  CustomSelect,
} from "../../components/Select/CustomSelect";
import { randomizedListEgg } from "../../shared/constants/mockData";
import { MaterialSymbolsClose } from "../../shared/icons/Icon";
import { IEgg } from "../../shared/types/egg";
import { IOrder } from "../../shared/types/order";
import { alignCenterSx } from "../../styled/styled";

type Step1Props = UseFormReturn<IOrder>;
export const CreateFormOpt2 = (props: Step1Props) => {
  const [data, setData] = useState(randomizedListEgg);

  return (
    <Page title="Chọn loại và nhập số lượng">
      <Grid container spacing={1}>
        {data.map((item, index) => (
          <Grid item xs={6}>
            <MixBox {...props} itemData={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

type MixBoxProps = Step1Props & { itemData: IEgg };
const MixBox = ({ itemData, register, getValues, watch }: MixBoxProps) => {
  const { price, name, onStock, weight } = itemData;

  const [offer, setOffer] = useState({ dealPrice: 0, numberOfEgg: 0 });
  const [active, setActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    console.log(getValues())
  };

  const handleAccept = () => {
    handleActive();
    handleClose();
    setOffer({ dealPrice: 3000, numberOfEgg: 5000 });
  };
  const handleActive = () => {
    setActive(true);
  };

  const handleInActive = () => {
    setActive(false);
    setOffer({ dealPrice: 0, numberOfEgg: 0 });
  };

  let dealPriceOptions = [
    {
      value: price,
      key: 0,
    },
    {
      value: price - 25,
      key: 1,
    },
    {
      value: price - 50,
      key: 2,
    },
    {
      value: price - 75,
      key: 3,
    },
    {
      value: price - 100,
      key: 4,
    },
  ];

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 8,
        backgroundColor: active ? "green" : grey["300"],
        position: "relative",
      }}
    >
      {active && (
        <Box sx={{ position: "absolute", top: "-15px", right: "-10px" }}>
          <Fab
            size="small"
            color="error"
            aria-label="add"
            onClick={handleInActive}
          >
            <MaterialSymbolsClose />
          </Fab>
        </Box>
      )}
      <TypeText>{name}</TypeText>

      <Stack>
        <Row>
          <Text> Khối lượng: </Text>
          <PriceText>{weight}</PriceText>
        </Row>
        <Row>
          <Text> Giá đề xuất: </Text>
          <PriceText>{price}</PriceText>
        </Row>

        <DisableBox active={active}>
          <Row>
            <Text> Giá mặc cả: </Text>
            <PriceText>{offer.dealPrice || "--------"}</PriceText>
          </Row>
        </DisableBox>

        <DisableBox active={active}>
          <Row>
            <Text> Số lượng </Text>
            <PriceText>{offer.numberOfEgg || "--------"}</PriceText>
          </Row>
        </DisableBox>
      </Stack>
      <Box mt={2} mb={1} component="div" sx={{ ...alignCenterSx }}>
        {active ? (
          <EditButton variant="outlined" onClick={handleClickOpen}>
            <TextButton color="white">Sửa</TextButton>
          </EditButton>
        ) : (
          <Button
            sx={{ backgroundColor: "white" }}
            color="inherit"
            variant="contained"
            onClick={handleClickOpen}
          >
            <TextButton color="black">Chọn</TextButton>
          </Button>
        )}
      </Box>

      <BuyDialog open={openDialog} onClose={handleAccept}>
        <DialogTitle textAlign={"center"} fontWeight={900} fontSize={24}>
          {name.toUpperCase()}
        </DialogTitle>
        <HelperText variant="caption">{`${price}đ / quả`}</HelperText>
        <HelperText variant="caption">{"500g / 10 quả"}</HelperText>

        <DialogContent>
          <Stack mt={2} spacing={2}>
            <Box>
              <LabelText> {'Chọn mức giá (mặc cả):'} </LabelText>
              <CustomSelect
                slotProps={{ popper: { disablePortal: true } }}
                style={{
                  backgroundColor: !active ? grey["300"] : "",
                  color: !active ? grey["600"] : "",
                  width: 150,
                  zIndex: 10,
                }}
                {...register("orders.0.deal_price")}
                defaultValue={dealPriceOptions[0].value}
              >
                {dealPriceOptions.map((price, index) => (
                  <CustomOption
                    sx={{ fontWeight: index ? 500 : 900 }}
                    key={index}
                    value={price.value}
                  >{`${price.value}`}</CustomOption>
                ))}
              </CustomSelect>
            </Box>

            <Box>
              <LabelText> Số lượng </LabelText>
              <CustomInput
                style={{
                  width: 150,
                  textAlign: "center",
                }}
                {...register('orders.0.quantity')}
                type="number"
                placeholder="Nhập số lượng"
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleAccept} autoFocus>
            Chọn
          </Button>
        </DialogActions>
      </BuyDialog>
    </div>
  );
};

const BuyDialog = ({ open, onClose, children }: DialogProps) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};

const DisableBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{
  active?: boolean;
}>(({ active }) => ({
  backgroundColor: active ? "" : grey["300"],
}));

const Row = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const EditButton = styled(Button)({
  borderColor: "white",
});
const TextButton = styled(Typography)(({ theme }) => ({
  textTransform: "none",
  [theme.breakpoints.up("sm")]: {},
}));
const Text = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {},
}));
const LabelText = styled(Typography)(({ theme }) => ({
  fontSize:16,
  [theme.breakpoints.up("sm")]: {},
}));
const HelperText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));

const TypeText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  textTransform: "uppercase",
  [theme.breakpoints.up("sm")]: {},
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 800,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
