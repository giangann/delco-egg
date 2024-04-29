import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import {
  CustomDateRangePicker,
  IDateRange,
} from "../../components/DateRange/CustomDateRangePicker";
import { MobileFilterDrawer } from "../../components/Drawer/MobileFilterDrawer";
import { BaseInput } from "../../components/Input/BaseInput";
import { FlowbiteAdjustmentsHorizontalOutline } from "../../shared/icons/Icon";
import { InputLabelText } from "../../styled/styled";
import { useForm } from "react-hook-form";

export const FilterOrder = () => {
  const [open, setOpen] = useState(false);

  // use form params
  const {} = useForm()
  
  const onOpen = () => {
    setOpen(true);
  };

  const handleFilter = () =>{
    // const newParams = getValue
  }
  return (
    <Box>
      <IconButton onClick={onOpen}>
        <FlowbiteAdjustmentsHorizontalOutline />
      </IconButton>
      <MobileFilterDrawer open={open} onClose={() => setOpen(false)}>
        <FilterOption />
      </MobileFilterDrawer>
    </Box>
  );
};

const FilterOption = () => {
  const [date, setDate] = useState<IDateRange>({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const [createdAtDate, setCreatedAtDate] = useState<IDateRange>({
    startDate: dayjs(),
    endDate: dayjs(),
  });
  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid black", py: 1.5, px: 2 }}>
        <Typography fontSize={20} fontWeight={500}>
          Bộ lọc
        </Typography>
      </Box>
      {/* status, date range, time range, company */}
      <Box height={400} px={2} py={2} component={"form"}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <InputLabelText>Ngày lấy hàng trong khoảng:</InputLabelText>
            <Stack direction="row" alignItems={"center"}>
              <CustomDateRangePicker
                dateRange={{ ...date }}
                onChange={(newValue: IDateRange) => {
                  setDate(newValue);
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <InputLabelText>Ngày đặt hàng trong khoảng:</InputLabelText>
            <Stack direction="row" alignItems={"center"}>
              <CustomDateRangePicker
                dateRange={{ ...createdAtDate }}
                onChange={(newValue: IDateRange) => {
                  setCreatedAtDate(newValue);
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <InputLabelText>Tên người đặt:</InputLabelText>
            <BaseInput placeholder="Nhập tên" />
          </Grid>

          <Grid item xs={12}>
            <InputLabelText>Tên công ty:</InputLabelText>
            <BaseInput placeholder="Nhập tên" />
          </Grid>
        </Grid>

        <Stack direction={"row"} spacing={2} my={2}>
          <Button variant="outlined">Reset</Button>

          <Button variant="contained">Lọc</Button>
        </Stack>
      </Box>
    </Box>
  );
};
