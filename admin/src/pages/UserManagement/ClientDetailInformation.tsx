import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { IUserProfile } from "../../shared/types/user";
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
            <BoxFieldValue>
              {note ||
                "Chưa có ghi chú"}
            </BoxFieldValue>
          </BoxContent>
        </Grid>
      </Grid>
    </Paper>
  );
};

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {},
}));
const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));

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
