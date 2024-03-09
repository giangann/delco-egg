import { Box, Button } from "@mui/material";
import React from "react";
import {
  IcRoundKeyboardBackspace,
  MaterialSymbolsArrowCircleRight,
} from "../../shared/icons/Icon";
import {
  ButtonResponsive,
  FlexDefaultBox,
  PageTitleText,
} from "../../styled/styled";

interface PageProps {
  title: string;
  children: React.ReactNode;
  onGoBack?: () => void;
  onCreate?: () => void;
}
export const PageMobile = ({
  title,
  children,
  onGoBack,
  onCreate,
}: PageProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box position="relative">
        <Box
          sx={{
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {onGoBack && (
            <Button onClick={onGoBack} sx={{ padding: 0 }} variant="outlined">
              <IcRoundKeyboardBackspace fontSize={28} />
            </Button>
          )}
        </Box>
        <PageTitleText mt={2} mb={2}>
          {title}
        </PageTitleText>
        {onCreate && (
          <FlexDefaultBox my={3} justifyContent={"center"}>
            <ButtonResponsive
              onClick={onCreate}
              variant="contained"
              endIcon={
                <MaterialSymbolsArrowCircleRight
                  color={"white"}
                  style={{ fontSize: 16 }}
                />
              }
            >
              Tạo mới
            </ButtonResponsive>
          </FlexDefaultBox>
        )}
      </Box>

      {children}
    </Box>
  );
};
