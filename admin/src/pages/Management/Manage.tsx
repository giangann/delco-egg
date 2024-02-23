import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { Page } from "../../components/Page/Page";
import { Item, items } from "../Home/Home";
import { LinkCustom } from "../../styled/styled";
import { GREEN } from "../../styled/color";
import { useDevice } from "../../hooks/useDevice";
import { IcBaselineAddCircleOutline } from "../../shared/icons/Icon";

export const Manage = () => {
  const { isMobile } = useDevice();

  return (
    <Page title="Quản lý">
      <Grid container spacing={{ xs: 1.5, sm: 2 }} mb={2}>
        {items.map((item: Item, index: number) => (
          <Grid item xs={6} sm={3} key={index}>
            <LinkCustom to={item.path}>
              <Paper
                elevation={4}
                sx={{
                  backgroundColor: GREEN["500"],
                  py: { xs: 2, sm: 4 },
                  px: 1.5,
                  color: "whitesmoke",
                  minHeight: isMobile ? 90 : "none",
                }}
              >
                <Stack spacing={1} alignItems={"center"}>
                  <TypeText>{item.text}</TypeText>
                  <IcBaselineAddCircleOutline fontSize={isMobile ? 20 : 24} />
                </Stack>
              </Paper>
            </LinkCustom>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

const TypeText = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    fontWeight: 700,
  
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      fontSize: 22,
    },
  }));