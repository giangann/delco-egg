import { Box, Typography, styled } from "@mui/material";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";
import { GREEN } from "../../styled/color";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { ORDER_STATUS_LABEL } from "../../shared/constants/orderStatus";

export const BoxByStatus = ({ status }: { status: number }) => {
  let bgColor;
  let textColor;
  let statusLabel;

  switch (status) {
    case ORDER_STATUS.WAITING_APPROVAL:
      bgColor = `${Orange}${OPACITY_TO_HEX["20"]}`;
      textColor = Orange;
      statusLabel = ORDER_STATUS_LABEL.WAITING_APPROVAL;
      break;
    case ORDER_STATUS.ACCEPTED:
      bgColor = `${GREEN["500"]}${OPACITY_TO_HEX["20"]}`;
      textColor = GREEN["600"];
      statusLabel = ORDER_STATUS_LABEL.ACCEPTED;
      break;

    case ORDER_STATUS.SUCCESS:
      bgColor = `${Blue}${OPACITY_TO_HEX["20"]}`;
      textColor = Blue;
      statusLabel = ORDER_STATUS_LABEL.SUCCESS;
      break;

    case ORDER_STATUS.REJECTED:
      bgColor = `${Red}${OPACITY_TO_HEX["20"]}`;
      textColor = Red;
      statusLabel = ORDER_STATUS_LABEL.REJECTED;
      break;

    case ORDER_STATUS.CANCELED:
      bgColor = `${Purple}${OPACITY_TO_HEX["20"]}`;
      textColor = Purple;
      statusLabel = ORDER_STATUS_LABEL.CANCELED;
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        margin: "0 auto",
        paddingX: 1,
        paddingY: 0.5,
        borderRadius: 0.5,
        width: "fit-content",
        backgroundColor: bgColor,
      }}
    >
      <StatusText color={textColor}>{statusLabel} </StatusText>
    </Box>
  );
};

const StatusText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 550,
  whiteSpace: "none",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));

const Orange = "#ed6c02";
const Red = "#d32f2f";
const Purple = "#9c27b0";
const Blue = "#1976d2";