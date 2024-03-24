import { Box } from "@mui/material";
import { StatusTabs } from "./StatusTabs";
import { useContext } from "react";
import { OrderListParamsContext } from "../../contexts/OrderListParamsContext";
import { ORDER_STATUS } from "../../shared/constants/orderStatus";

export const FilterList = () => {
  const { params, setParams } = useContext(OrderListParamsContext);

  const onStatusChange = (newValue: number) => {
    let newStatus: ORDER_STATUS = ORDER_STATUS.WAITING_APPROVAL;
    if (newValue in ORDER_STATUS) newStatus = newValue;
    setParams("status", newStatus);
  };
  return (
    <Box
      py={1}
      my={1}
      //sx={{overflowX:'scroll'}}
    >
      <StatusTabs onChange={onStatusChange} />
    </Box>
  );
};
