import {
  Box,
  CircularProgress,
  Dialog,
  DialogProps,
  Typography,
  styled,
} from "@mui/material";
import { BoxFlexEnd, ButtonResponsive } from "../../styled/styled";

type ConfirmDialogProps = {
  onClose: () => void;
  onAccept: () => void;
  isSubmitting?: boolean;
  title?: string;
  content?: string;
  childrent?: React.ReactNode;
} & DialogProps;
export const ConfirmDialog = ({
  isSubmitting,
  title,
  content,
  children,
  onClose,
  onAccept,
  ...dialogProps
}: ConfirmDialogProps) => {
  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <Box p={3}>
        <StyledTitleText>{title}</StyledTitleText>
        <StyledContentText>{content}</StyledContentText>
        {children}

        <BoxFlexEnd my={3}>
          <ButtonResponsive onClick={() => onClose()} variant="outlined">
            Hủy
          </ButtonResponsive>
          <ButtonResponsive
            onClick={onAccept}
            sx={{ marginLeft: 1 }}
            variant="contained"
            disabled={isSubmitting}
            endIcon={
              isSubmitting && <CircularProgress color="inherit" size={14} />
            }
          >
            Ok
          </ButtonResponsive>
        </BoxFlexEnd>
      </Box>
    </Dialog>
  );
};

const StyledTitleText = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  fontWeight: 650,
  [theme.breakpoints.up("sm")]: {
    fontSize: 18,
  },
}));

const StyledContentText = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));
