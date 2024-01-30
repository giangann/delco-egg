import { Grid } from "@mui/material";
import { useContext } from "react";
import { Page } from "../../components/Page/Page";
import { FormContext } from "./CreateForm";
import { ItemBox } from "./ItemBox";

export const CreateFormOpt2 = () => {
  const listEggPriceQty = useContext(FormContext).data;
  return (
    <Page title="Chọn loại, nhập số lượng">
      <Grid container spacing={2}>
        {listEggPriceQty.map((item, index) => (
          <Grid key={index} item xs={6} sm={4}>
            <ItemBox item={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};
