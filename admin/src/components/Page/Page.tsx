import { Container, Paper } from "@mui/material";
import React from "react";
import { useDevice } from "../../hooks/useDevice";
import { PageTitleText } from "../../styled/styled";

interface PageProps {
  title: string;
  children: React.ReactNode;
}
export const Page = ({ title, children }: PageProps) => {
  const isMobile = useDevice();
  return (
    <Container sx={{ paddingX: { xs: 1, sm: "unset" } }}>
      <Paper
        elevation={isMobile ? 0 : 1}
        sx={{ paddingY: { xs: 0, sm: 2 }, mt: 3 }}
      >
        <PageTitleText mb={4}>{title}</PageTitleText>

        {children}
      </Paper>
    </Container>
  );
};
