import { Theme, Typography, styled } from "@mui/material";
import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";
import { MUIStyledCommonProps } from "@mui/system";

interface BaseInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    MUIStyledCommonProps<Theme> {
  label?: string;
  required?: boolean;
}

export const BaseInput = forwardRef(
  (props: BaseInputProps, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const { label, required, ...otherProps } = props;
    return (
      <>
        <label>
          <InputLabelText>{label}</InputLabelText>
          {required && <span style={{ color: "red", marginLeft: 6 }}>*</span>}
          <StyledBaseInput {...otherProps} ref={ref} />
        </label>
      </>
    );
  }
);

const InputLabelText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  marginBottom: 4,
  display: "inline",
  [theme.breakpoints.up("sm")]: {
    fontSize: 16,
  },
}));

const StyledBaseInput = styled("input")(({ theme }) => ({
  fontFamily: "Montserrat",
  padding: "3px 6px",
  width: "100%",
  minWidth: "100px",
  fontSize: 14,

  [theme.breakpoints.up("sm")]: {
    padding: "4px 8px",
    fontSize: 16,
  },
}));
