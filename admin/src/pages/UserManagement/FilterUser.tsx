import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MobileFilterDrawer } from "../../components/Drawer/MobileFilterDrawer";
import { BaseInput } from "../../components/Input/BaseInput";
import { UserListContext } from "../../contexts/UserListContext";
import { FlowbiteAdjustmentsHorizontalOutline } from "../../shared/icons/Icon";
import { InputLabelText } from "../../styled/styled";

export const FilterUser = () => {
  const [open, setOpen] = useState(false);
  const { params } = useContext(UserListContext);
  const isHaveFilter = Object.keys(params).length > 2;

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
  const { params, setParams, clearParams } = useContext(UserListContext);
  const { phone_number, fullname, username } = params;
  const { register, getValues, setValue } = useForm<{
    username: string;
    phone_number: string;
    fullname: string;
  }>({
    defaultValues: {
      username: username || "",
      phone_number: phone_number || "",
      fullname: fullname || "",
    },
  });
  const handleFilter = () => {
    const username = getValues("username");
    if (username) {
      setParams("username", getValues("username"));
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
    clearParams("username");
    clearParams("phone_number");
    clearParams("fullname");

    // clear input
    setValue("username", "");
    setValue("phone_number", "");
    setValue("fullname", "");
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
            <InputLabelText>Tên đăng nhập:</InputLabelText>
            <BaseInput
              {...register("username")}
              placeholder="Nhập username ..."
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabelText>Họ tên:</InputLabelText>
            <BaseInput
              {...register("fullname")}
              placeholder="Nhập họ tên ..."
            />
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
