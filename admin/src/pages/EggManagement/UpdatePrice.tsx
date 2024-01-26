import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { getApi } from "../../lib/utils/fetch/fetchRequest";

export const UpdatePrice = () => {

  useEffect(()=>{
   async function fetchEggPriceQty (){
    const res = await getApi('egg-price-qty')
    console.log(res)
   }
   fetchEggPriceQty()
  })
  return (
    <Container>
      <Box>
        <h1>Cập nhật giá trứng</h1>
      </Box>
    </Container>
  );
};
