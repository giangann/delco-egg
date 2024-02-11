import { Grid } from "@mui/material";
import { useContext } from "react";
import { Page } from "../../components/Page/Page";
import { eggPriceQtyInOrderItem } from "../../shared/helpers/function";
import { FormContext } from "./CreateForm";
import { ItemBox } from "./ItemBox";

export const Step1 = () => {
  const listEggPriceQty = useContext(FormContext).data;
  const saveOrder = useContext(FormContext).saveOrder;

  return (
    <Page title="Chọn loại, nhập số lượng">
      <Grid container spacing={2}>
        {listEggPriceQty.map((item, index) => (
          <Grid key={index} item xs={6} sm={4}>
            <ItemBox
              saveOrderItem={eggPriceQtyInOrderItem(saveOrder?.items, item)}
              item={item}
            />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};
