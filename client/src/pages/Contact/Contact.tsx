import { Box, Grid, Typography, styled } from "@mui/material";
import { Page } from "../../components/Page/Page";
import { GREEN } from "../../styled/color";

export const Contact = () => {
  return (
    <Page title="Thông tin liên hệ">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <ContactBox/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ContactBox/>
        </Grid> <Grid item xs={12} sm={4}>
          <ContactBox/>
        </Grid>
      </Grid>
    </Page>
  );
};

const ContactBox = () =>{
  return (
    <Box p={2} sx={{border: `1px solid ${GREEN['500']}`}}>
      <BoxTitle>{'Admin Nguyễn Văn A'}</BoxTitle>

      <BoxContent>{'SĐT: 0909444666'}</BoxContent>
    </Box>
  )
}

const BoxTitle = styled(Typography)(({theme})=>({
  fontWeight:600,
  fontSize:18,
  [theme.breakpoints.up('sm')]:{}
}))
const BoxContent = styled(Typography)(({theme})=>({
  fontSize:16,
  [theme.breakpoints.up('sm')]:{}
}))