import { Box, Button, Stack } from "@mui/material";
import { TextButton } from "../../styled/styled";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";
import { StreamlineBagDollarSolid } from "../../shared/icons/Icon";
import { useState } from "react";
import { fakeDelay } from "../../shared/helper";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { toast } from "react-toastify";
import { putApi } from "../../lib/utils/fetch/fetchRequest";

type OrderActionByStatusProps = {
  orderId: number;
  status: number;
  triggerRefetch: () => void;
};
export const OrderActionByStatus = ({
  status,
  triggerRefetch,
  orderId,
}: OrderActionByStatusProps) => {
  let leftLabel;
  let rightLabel;

  let leftButton;
  let rightButton;

  let dialogContent;
  let newStatus: ORDER_STATUS;

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [openCFDialog, setOpenCFDialog] = useState(false);

  switch (status) {
    case ORDER_STATUS.WAITING_APPROVAL:
      leftLabel = "Từ chối";
      dialogContent = leftLabel;
      newStatus = ORDER_STATUS.REJECTED;
      leftButton = (
        <Button
          onClick={() => setOpenCFDialog(true)}
          variant="outlined"
          color="error"
        >
          <TextButton>{leftLabel}</TextButton>
        </Button>
      );
      rightLabel = "Chấp nhận";
      dialogContent = rightLabel;
      newStatus = ORDER_STATUS.ACCEPTED;
      rightButton = (
        <Button
          onClick={() => setOpenCFDialog(true)}
          variant="contained"
          color="success"
        >
          <TextButton>{rightLabel}</TextButton>
        </Button>
      );
      break;
    case ORDER_STATUS.ACCEPTED:
      leftLabel = "Hủy";
      dialogContent = leftLabel;
      newStatus = ORDER_STATUS.CANCELED;
      leftButton = (
        <Button
          onClick={() => setOpenCFDialog(true)}
          variant="outlined"
          color="error"
        >
          <TextButton>{leftLabel}</TextButton>
        </Button>
      );
      rightLabel = "Hoàn thành";
      dialogContent = rightLabel;
      newStatus = ORDER_STATUS.SUCCESS;
      rightButton = (
        <Button
          onClick={() => setOpenCFDialog(true)}
          startIcon={<StreamlineBagDollarSolid />}
          variant="contained"
          color="success"
        >
          <TextButton>{rightLabel}</TextButton>
        </Button>
      );
      break;
    default:
      break;
  }

  const onChangeStatus = async () => {
    setIsSubmiting(true);
    const changeStatusRes = await putApi(`order/${orderId}/update-status`, {
      status: newStatus,
    });
    console.log(changeStatusRes);

    if (changeStatusRes.success) {
      toast.success("Cập nhật thành công");
    } else {
      toast.error(changeStatusRes.error.message);
    }

    setIsSubmiting(false);
    setOpenCFDialog(false);
    triggerRefetch();
  };
  return (
    <>
      {status !== ORDER_STATUS.REJECTED &&
        status !== ORDER_STATUS.CANCELED &&
        status !== ORDER_STATUS.SUCCESS && (
          <Box mt={3}>
            <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
              {leftButton}
              {rightButton}
            </Stack>
          </Box>
        )}
      <ConfirmDialog
        open={openCFDialog}
        onClose={() => setOpenCFDialog(false)}
        title="Xác nhận thao tác"
        content={`Xác nhận ${dialogContent}`}
        isSubmitting={isSubmiting}
        onAccept={onChangeStatus}
      />
    </>
  );
};
