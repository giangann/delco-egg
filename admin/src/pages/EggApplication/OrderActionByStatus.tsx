// take status, orderId, and trigger refetch current order function

import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmDialog } from "../../components/Dialog/ConfirmDialog";
import { BaseInput } from "../../components/Input/BaseInput";
import { putApi } from "../../lib/utils/fetch/fetchRequest";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";
import { StreamlineBagDollarSolid } from "../../shared/icons/Icon";
import { BoxFlexEnd, TextButton } from "../../styled/styled";

type OrderActionByStatusProps = {
  status: ORDER_STATUS;
  orderId: number;
  triggerRefetch: () => void;
};

export const OrderActionByStatus = ({
  status,
  orderId,
  triggerRefetch,
}: OrderActionByStatusProps) => {
  let [openCFDialog, setOpenCFDialog] = useState(false);
  let [reason, setReason] = useState<string | null>(null);
  let [content, setContent] = useState<string | null | React.ReactNode>(null);
  let [newStatus, setNewStatus] = useState<ORDER_STATUS>(status);
  let isDisplayAction =
    status === ORDER_STATUS.WAITING_APPROVAL ||
    status === ORDER_STATUS.ACCEPTED;

  let isResonRequired =
    newStatus === ORDER_STATUS.REJECTED || newStatus === ORDER_STATUS.CANCELED;

  const onOpenDialog = (newStatus: ORDER_STATUS, content: string) => {
    setNewStatus(newStatus);
    setContent(content);
    setOpenCFDialog(true);
  };

  const onAccept = async () => {
    let data = {
      status: newStatus,
      reason: isResonRequired ? reason : null,
    };
    const updateStatusRes = await putApi(
      `order/${orderId}/update-status`,
      data
    );
    if (updateStatusRes.success) {
      toast.success("Update success");
      triggerRefetch();
    }
    setOpenCFDialog(false);
  };
  return (
    <>
      {isDisplayAction && (
        <BoxFlexEnd>
          {RejectOrCancelButton(status, onOpenDialog)}
          {AcceptOrderFinishButton(status, onOpenDialog)}
          <ConfirmDialog
            open={openCFDialog}
            onClose={() => setOpenCFDialog(false)}
            title="Xác nhận thao tác"
            content={`Xác nhận ${content}`}
            onAccept={onAccept}
            disabled={!reason && isResonRequired}
          >
            {isResonRequired && (
              <div style={{ marginTop: 8 }}>
                <BaseInput
                  type="text"
                  label="Nhập lý do"
                  placeholder={`Ví dụ: ${
                    newStatus === ORDER_STATUS.REJECTED
                      ? "Giá mix 4 quá thấp"
                      : "Người mua báo hủy"
                  }`}
                  value={reason || ""}
                  required
                  onChange={(event) => setReason(event.target.value)}
                />
              </div>
            )}
          </ConfirmDialog>
        </BoxFlexEnd>
      )}
    </>
  );
};

const RejectOrCancelButton = (
  status: ORDER_STATUS,
  onOpenDialog: (newStatus: ORDER_STATUS, content: string) => void
) => {
  let btnText = "";
  let newStatus: ORDER_STATUS;
  if (status === ORDER_STATUS.WAITING_APPROVAL) {
    btnText = "Từ chối";
    newStatus = ORDER_STATUS.REJECTED;
  }
  if (status === ORDER_STATUS.ACCEPTED) {
    btnText = "Hủy";
    newStatus = ORDER_STATUS.CANCELED;
  }

  return (
    <>
      <Button
        onClick={() => onOpenDialog(newStatus, btnText)}
        color="error"
        variant="outlined"
      >
        <TextButton>{btnText}</TextButton>
      </Button>
    </>
  );
};

const AcceptOrderFinishButton = (
  status: ORDER_STATUS,
  onOpenDialog: (newStatus: ORDER_STATUS, content: string) => void
) => {
  let btnText = "";
  let newStatus: ORDER_STATUS;

  if (status === ORDER_STATUS.WAITING_APPROVAL) {
    btnText = "Chấp nhận";
    newStatus = ORDER_STATUS.ACCEPTED;
  }
  if (status === ORDER_STATUS.ACCEPTED) {
    btnText = "Hoàn thành";
    newStatus = ORDER_STATUS.SUCCESS;
  }
  return (
    <Button
      onClick={() => onOpenDialog(newStatus, btnText)}
      color="success"
      variant="contained"
      sx={{ marginLeft: 2 }}
      startIcon={
        status === ORDER_STATUS.ACCEPTED && <StreamlineBagDollarSolid />
      }
    >
      <TextButton>{btnText}</TextButton>
    </Button>
  );
};
