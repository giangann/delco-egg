import { Box, Typography } from "@mui/material";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import {
  ORDER_STATUS,
  ORDER_STATUS_LABEL,
} from "../../shared/constants/orderStatus";
import { COLOR_BG_STATUS } from "../../styled/color";

type BlockProps = {
  newStatus: ORDER_STATUS;
  adminName: string;
  dateTime: string;
  diffTime: string;
  reason?: string;
};

export const TrackingStatusBlock = ({
  newStatus,
  adminName,
  dateTime,
  diffTime,
  reason,
}: BlockProps) => {
  let bgColor;
  let statusLabel;
  let isShowReason = false;

  if (
    newStatus === ORDER_STATUS.REJECTED ||
    newStatus === ORDER_STATUS.CANCELED
  ) {
    isShowReason = true;
  }

  switch (newStatus) {
    case ORDER_STATUS.ACCEPTED:
      bgColor = `${COLOR_BG_STATUS.ACCEPTED}${OPACITY_TO_HEX["10"]}`;
      statusLabel = ORDER_STATUS_LABEL.ACCEPTED;
      break;

    case ORDER_STATUS.SUCCESS:
      bgColor = `${COLOR_BG_STATUS.SUCCESS}${OPACITY_TO_HEX["10"]}`;
      statusLabel = ORDER_STATUS_LABEL.SUCCESS;
      break;

    case ORDER_STATUS.REJECTED:
      bgColor = `${COLOR_BG_STATUS.REJECTED}${OPACITY_TO_HEX["10"]}`;
      statusLabel = ORDER_STATUS_LABEL.REJECTED;
      break;

    case ORDER_STATUS.CANCELED:
      bgColor = `${COLOR_BG_STATUS.CANCELED}${OPACITY_TO_HEX["10"]}`;
      statusLabel = ORDER_STATUS_LABEL.CANCELED;
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        mt: 1,
        py: 1.5,
        backgroundColor: bgColor,
      }}
    >
      <Typography textAlign={"center"}>
        {`${statusLabel} bởi: `}
        <span style={{ fontWeight: 600 }}>{adminName}</span>
      </Typography>
      {isShowReason && reason && (
        <Typography textAlign={"center"}>
          {`Lý do: `}
          <span style={{ fontWeight: 600 }}>{`${reason}`}</span>
        </Typography>
      )}
      <Typography textAlign={"center"}>
        {`Lúc: ${dateTime} `}
        <span style={{ fontWeight: 600 }}>{`<${diffTime}>`}</span>
      </Typography>
    </Box>
  );
};
