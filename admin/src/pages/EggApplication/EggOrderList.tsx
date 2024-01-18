import { Box, Container } from "@mui/material";
import { CustomTable, StrictField } from "../../components/Table/Customtable";
import { listOrders } from "../../shared/constants/mockData";

export interface EggForm {
  formId: string;
  dateCreated: Date | string;
  timeCreated: Date | string;
  totalPrice: number;
  status: string;
}

export const EggOrderList = () => {
  const fields: StrictField<EggForm>[] = [
    {
      header: "Id of form",
      fieldKey: "formId",
    },
    {
      header: "Id of form",
      fieldKey: "dateCreated",
    },
    {
      header: "Id of form",
      fieldKey: "timeCreated",
    },
    {
      header: "Id of form",
      fieldKey: "totalPrice",
    },
    {
      header: "Id of form",
      fieldKey: "status",
    },
  ];
  return (
    <Container>
      <Box>
        <h1>Danh sách đơn trứng</h1>
      </Box>
      <CustomTable fields={fields} data={listOrders} />
    </Container>
  );
};

// const eggOrderData: EggForm&StrictField = listOrders.map((order)=>{...order,header: })
