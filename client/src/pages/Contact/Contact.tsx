import { Box, Grid, Typography, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { Page } from "../../components/Page/Page";
import { GREEN } from "../../styled/color";
import { BaseSelect } from "../../components/Select/BaseSelect";

let price = 3000;
let dealPriceOptions = [
  {
    label: price,
    value: price,
    key: 0,
  },
  {
    label: price - 25,
    value: price - 25,
    key: 1,
  },
  {
    label: price - 50,
    value: price - 50,
    key: 2,
  },
  {
    label: price - 75,
    value: price - 75,
    key: 3,
  },
  {
    label: price - 100,
    value: price - 100,
    key: 4,
  },
];
export const Contact = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Page title="Thông tin liên hệ">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <ContactBox />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ContactBox />
        </Grid>{" "}
        <Grid item xs={12} sm={4}>
          <ContactBox />
        </Grid>
      </Grid>

      <Box mt={10}>
        <form onSubmit={handleSubmit((value) => console.log(value))}>
          <button type="submit">submit</button>

          <BaseSelect {...register("price")} items={dealPriceOptions} />

          {/* <BaseSelect2 {...register("deal_price")} items={dealPriceOptions} /> */}
        </form>
      </Box>
    </Page>
  );
};

const ContactBox = () => {
  return (
    <Box p={2} sx={{ border: `1px solid ${GREEN["500"]}` }}>
      <BoxTitle>{"Admin Nguyễn Văn A"}</BoxTitle>

      <BoxContent>{"SĐT: 0909444666"}</BoxContent>
    </Box>
  );
};

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {},
}));
const BoxContent = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  [theme.breakpoints.up("sm")]: {},
}));
