import {
  Box,
  Button,
  Paper,
  Typography,
  styled
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { putApi } from "../../lib/utils/fetch/fetchRequest";
import { IUserLogin } from "../../shared/types/user";
import {
  StackAlignCenterJustifySpaceBetween,
  TextButton,
} from "../../styled/styled";
export const ClientDetailAccount = ({
  username,
}: Pick<IUserLogin, "username">) => {
  const [openDialog, setOpenDialog] = useState(false);
  const params = useParams();

  const onResetPassword = async () => {
    const respond = await putApi(`user/reset-password/${params.id}`);
    if (respond.success) toast.success("Đặt lại mật khẩu thành công");

    setOpenDialog(false);
  };
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <StackAlignCenterJustifySpaceBetween>
        <BoxTitle>{"Tài khoản"}</BoxTitle>

        <EditButton
          onClick={() => setOpenDialog(true)}
          color="warning"
          variant="outlined"
        >
          <TextButton>Reset mật khẩu</TextButton>
        </EditButton>
      </StackAlignCenterJustifySpaceBetween>
      <BoxContent>
        <BoxFieldName>Tên đăng nhập</BoxFieldName>
        <BoxFieldValue>{username}</BoxFieldValue>
      </BoxContent>

      <BoxContent>
        <BoxFieldName>Mật khẩu</BoxFieldName>
        <BoxFieldValue>{"**********"}</BoxFieldValue>
      </BoxContent>
      <ConfirmDialog
        title="Xác nhận đặt lại mật khẩu"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAccept={onResetPassword}
      >
        <Typography fontSize={18}>
          Mật khẩu của người dùng:
          <Typography component="span" mx={1} fontWeight={600} fontSize={18}>
            {username}
          </Typography>
          sẽ được đặt về mật khẩu mặc định
          <Typography component="span" mx={1} fontWeight={600} fontSize={18}>
            {12345678}
          </Typography>
        </Typography>
      </ConfirmDialog>
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

const EditButton = styled(Button)(({ theme }) => ({
  // color:grey['300'],
  [theme.breakpoints.up("sm")]: {},
}));
