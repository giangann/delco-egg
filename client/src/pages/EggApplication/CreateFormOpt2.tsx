import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { CustomInput } from "../../components/Input/CustomInput";
import {
  Option as CustomOption,
  CustomSelect,
} from "../../components/Select/CustomSelect";
import { useDevice } from "../../hooks/useDevice";
import { MaterialSymbolsClose } from "../../shared/icons/Icon";
import { PageTitleText, alignCenterSx } from "../../styled/styled";
import { eggPrices } from "../Home/Home";
export const CreateFormOpt2 = () => {
  const { isMobile } = useDevice();
  return (
    <Container>
      <Paper
        elevation={isMobile ? 0 : 1}
        sx={{ padding: { xs: 0, sm: 2 }, mt: 3 }}
      >
        <PageTitleText mb={2}>Chọn loại và nhập số lượng</PageTitleText>

        <Grid container spacing={1}>
          {eggPrices.map((type) => (
            <Grid item xs={6}>
              <MixBox type={type.type} price={type.price} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* <Paper elevation={1} sx={{ padding: 2 }}></Paper> */}
    </Container>
  );
};

const MixBox = ({ type, price }: { type: string; price: number }) => {
  const [offer, setOffer] = useState({ dealPrice: 0, numberOfEgg: 0 });
  const [active, setActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
      <TypeText>{type}</TypeText>

      <Stack>
        <Row>
          <Text> Khối lượng: </Text>
          <PriceText>{price / 10}</PriceText>
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
            <TextButton color="black">Mua</TextButton>
          </Button>
        )}
      </Box>

      <BuyDialog open={openDialog} onClose={handleAccept}>
        <DialogTitle
          textAlign={"center"}
          fontWeight={900}
          fontSize={24}
          id="alert-dialog-title"
        >
          {type.toUpperCase()}
        </DialogTitle>
        <HelperText variant="caption">{`${price}đ / quả`}</HelperText>
        <HelperText variant="caption">{"500g / 10 quả"}</HelperText>

        <DialogContent>
          <Stack mt={2} spacing={2}>
            <Box>
              <Text> Giá mặc cả: </Text>
              <CustomSelect
                slotProps={{ popper: { disablePortal: true } }}
                style={{
                  backgroundColor: !active ? grey["300"] : "",
                  color: !active ? grey["600"] : "",
                  width: 150,
                  zIndex: 10,
                }}
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
              <Text> Số lượng </Text>
              <CustomInput
                style={{
                  width: 150,
                  textAlign: "center",
                }}
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
