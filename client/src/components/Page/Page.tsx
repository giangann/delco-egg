import { Box, Button, Container, Paper } from "@mui/material";
import React from "react";
import { useDevice } from "../../hooks/useDevice";
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
export const Page = ({ title, children, onGoBack, onCreate }: PageProps) => {
  const isMobile = useDevice();
  return (
    <Container sx={{ paddingX: { xs: 1, sm: 3 } }}>
      <Paper
        elevation={0}
        sx={{ paddingY: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 3 } }}
      >
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
          <PageTitleText mb={{ xs: 3, sm: 4 }}>{title}</PageTitleText>
          {onCreate && (
            <FlexDefaultBox my={3} justifyContent={"center"}>
              <ButtonResponsive
                onClick={onCreate}
                variant="contained"
                endIcon={
                  <MaterialSymbolsArrowCircleRight
                    color={"white"}
                    style={{ fontSize: isMobile ? 16 : 24 }}
                  />
                }
              >
                Tạo mới
              </ButtonResponsive>
            </FlexDefaultBox>
          )}
        </Box>

        {children}
      </Paper>
    </Container>
  );
};
