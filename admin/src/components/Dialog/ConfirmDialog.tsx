import {
  Box,
  CircularProgress,
  Dialog,
  DialogProps,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { BoxFlexEnd, ButtonResponsive } from "../../styled/styled";

type ConfirmDialogProps = {
  onClose: () => void;
  onAccept?: () => Promise<void>;
  isSubmitting?: boolean;
  title?: string;
  content?: string;
  childrent?: React.ReactNode;
  insideFormEl?: boolean;
  disabled?: boolean;
} & DialogProps;
export const ConfirmDialog = ({
  isSubmitting,
  title,
  content,
  children,
  onClose,
  onAccept,
  insideFormEl,
  disabled,
  ...dialogProps
}: ConfirmDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  let isShowLoading = isLoading || isSubmitting;

  const handleAccept = async () => {
    setIsLoading(true);
    if (onAccept) await onAccept();
    setIsLoading(false);
  };
  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <Box p={3}>
        <StyledTitleText>{title}</StyledTitleText>
        <StyledContentText>{content}</StyledContentText>
        {children}

        <BoxFlexEnd mt={3}>
          <ButtonResponsive onClick={() => onClose()} variant="outlined">
            Đóng
          </ButtonResponsive>
          {insideFormEl ? (
            <ButtonResponsive
              type="submit"
              sx={{ marginLeft: 1 }}
              variant="contained"
              disabled={disabled || isShowLoading}
              endIcon={
                isShowLoading && <CircularProgress color="inherit" size={14} />
              }
            >
              Ok
            </ButtonResponsive>
          ) : (
            <ButtonResponsive
              onClick={handleAccept}
              sx={{ marginLeft: 1 }}
              variant="contained"
              disabled={disabled || isShowLoading}
              endIcon={
                isShowLoading && <CircularProgress color="inherit" size={14} />
              }
            >
              Ok
            </ButtonResponsive>
          )}
        </BoxFlexEnd>
      </Box>
    </Dialog>
  );
};

const StyledTitleText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

const StyledContentText = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));
