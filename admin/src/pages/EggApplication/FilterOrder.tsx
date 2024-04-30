import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import {
  CustomDateRangePicker,
  IDateRange,
} from "../../components/DateRange/CustomDateRangePicker";
import { MobileFilterDrawer } from "../../components/Drawer/MobileFilterDrawer";
import { BaseInput } from "../../components/Input/BaseInput";
import { OrderListContext } from "../../contexts/OrderListContext";
import { CONFIG } from "../../shared/constants/common";
import { FlowbiteAdjustmentsHorizontalOutline } from "../../shared/icons/Icon";
import { InputLabelText } from "../../styled/styled";
import { useForm } from "react-hook-form";

export const FilterOrder = () => {
  const [open, setOpen] = useState(false);
  const { params } = useContext(OrderListContext);
  const isHaveFilter = Object.keys(params).length > 3;

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <IconButton onClick={onOpen}>
        <Badge color="secondary" variant="dot" invisible={!isHaveFilter}>
          <FlowbiteAdjustmentsHorizontalOutline />
        </Badge>
      </IconButton>
      <MobileFilterDrawer open={open} onClose={() => setOpen(false)}>
        <FilterOption />
      </MobileFilterDrawer>
    </Box>
  );
};

const FilterOption = () => {
  const { params, setParams, clearParams } = useContext(OrderListContext);
  const { start_date, end_date, phone_number, fullname } = params;
  const [date, setDate] = useState<IDateRange>({
    startDate: start_date,
    endDate: end_date,
  });
  const { register, getValues, setValue } = useForm<{
    phone_number: string;
    fullname: string;
  }>({
    defaultValues: {
      phone_number: phone_number || "",
      fullname: fullname || "",
    },
  });
  const handleFilter = () => {
    if (date.startDate) {
      setParams(
        "start_date",
        dayjs(date.startDate).format(CONFIG.MY_SQL_DATE_FORMAT)
      );
    }
    if (date.endDate) {
      setParams(
        "end_date",
        dayjs(date.endDate).format(CONFIG.MY_SQL_DATE_FORMAT)
      );
    }

    const phoneNumber = getValues("phone_number");
    if (phoneNumber) {
      setParams("phone_number", phoneNumber);
    }

    const fullName = getValues("fullname");
    if (fullName) {
      setParams("fullname", getValues("fullname"));
    }

    setParams("page", 1); // reset to first page
  };

  const clearFilter = () => {
    // clear params
    clearParams("start_date");
    clearParams("end_date");
    clearParams("fullname");
    clearParams("phone_number");

    // clear input
    setDate({ startDate: undefined, endDate: undefined });
    setValue('fullname','')
    setValue('phone_number','')
  };
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
                dateRange={date}
                onChange={(newValue: IDateRange) => {
                  setDate(newValue);
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <InputLabelText>Tên người đặt:</InputLabelText>
            <BaseInput {...register("fullname")} placeholder="Nhập tên ..." />
          </Grid>

          <Grid item xs={12}>
            <InputLabelText>Số điện thoại:</InputLabelText>
            <BaseInput
              {...register("phone_number")}
              placeholder="Nhập SĐT ..."
            />
          </Grid>
        </Grid>

        <Stack direction={"row"} spacing={2} my={2}>
          <Button variant="outlined" onClick={clearFilter}>
            Reset
          </Button>

          <Button variant="contained" onClick={handleFilter}>
            Lọc
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
