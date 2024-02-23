import { Box, Typography, styled } from "@mui/material";
import { Stack } from "@mui/system";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { GREEN } from "../../styled/color";
import { StackAlignCenterJustifySpaceBetween } from "../../styled/styled";

type BoxStatisticProps = {
  rightElementInTitleRow?: React.ReactNode;
  title: string | React.ReactNode;
  children: React.ReactNode;
};
export const BoxStatistic = ({
  rightElementInTitleRow,
  title,
  children,
}: BoxStatisticProps) => {
  return (
    <BoxWrapperStyled>
      <StackAlignCenterJustifySpaceBetween>
        <Stack direction="column">
          {typeof title == "string" ? (
            <Typography sx={{ fontWeight: 600, fontSize: 22 }}>
              {title}
            </Typography>
          ) : (
            title
          )}
          <TextUnderLine />
        </Stack>
        {rightElementInTitleRow}
      </StackAlignCenterJustifySpaceBetween>
      {children}
    </BoxWrapperStyled>
  );
};

const BoxWrapperStyled = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  padding: "10px",
  backgroundColor: `${GREEN["500"]}${OPACITY_TO_HEX["20"]}`,
  [theme.breakpoints.up("sm")]: {},
}));

const TextUnderLine = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: `${GREEN["500"]}${OPACITY_TO_HEX["70"]}`,
  height: "4px",
  width: "30px",
  [theme.breakpoints.up("sm")]: {},
}));
