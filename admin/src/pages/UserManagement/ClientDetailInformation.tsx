import {
  Box,
  Grid,
  Paper,
  Stack,
  styled
} from "@mui/material";
import { IUserProfile } from "../../shared/types/user";
import { BoxFieldName, BoxFieldValue, BoxTitle } from "../../styled/styled";
export const ClientDetailInformation = ({
  fullname,
  phone_number,
  company_name,
  note,
}: IUserProfile) => {
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <BoxTitle>{"Thông tin khác"}</BoxTitle>
      </Stack>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <BoxContent>
            <BoxFieldName>Số điện thoại</BoxFieldName>
            <BoxFieldValue>{phone_number}</BoxFieldValue>
          </BoxContent>
        </Grid>

        <Grid item xs={12} sm={6}>
          <BoxContent>
            <BoxFieldName>Họ tên</BoxFieldName>
            <BoxFieldValue>{fullname}</BoxFieldValue>
          </BoxContent>
        </Grid>

        <Grid item xs={12} sm={6}>
          <BoxContent>
            <BoxFieldName>Công ty</BoxFieldName>
            <BoxFieldValue>{company_name}</BoxFieldValue>
          </BoxContent>
        </Grid>

        <Grid item xs={12} sm={6}>
          <BoxContent>
            <BoxFieldName>Ghi chú</BoxFieldName>
            <BoxFieldValue>{note || "Chưa có ghi chú"}</BoxFieldValue>
          </BoxContent>
        </Grid>
      </Grid>
    </Paper>
  );
};

const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));
