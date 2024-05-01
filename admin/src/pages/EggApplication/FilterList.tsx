import { Box } from "@mui/material";
import { StatusTabs } from "./StatusTabs";
import { useContext } from "react";
import { OrderListContext } from "../../contexts/OrderListContext";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";

export const FilterList = () => {
  const { setParams } = useContext(OrderListContext);

  const onStatusChange = (newValue: number) => {
    let newStatus: ORDER_STATUS = ORDER_STATUS.WAITING_APPROVAL;
    if (newValue in ORDER_STATUS) newStatus = newValue;
    setParams("status", newStatus);
    setParams("page", 1);
  };
  return (
    <Box
    // py={1}
    // my={1}
    //sx={{overflowX:'scroll'}}
    >
      <StatusTabs onChange={onStatusChange} />
    </Box>
  );
};
