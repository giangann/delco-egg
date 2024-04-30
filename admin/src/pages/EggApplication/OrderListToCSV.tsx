import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ReactExportCsv } from "../../components/Excel/ReactExportCsv";
import { OrderListContext } from "../../contexts/OrderListContext";
import { IOrderRow } from "../../shared/types/order";

type TField = { fieldKey: keyof IOrderRow; header: string };

const fields: TField[] = [
  {
    fieldKey: "id",
    header: "ID",
  },
  {
    fieldKey: "date",
    header: "Ngày lấy hàng",
  },
  {
    fieldKey: "time",
    header: "Giờ lấy hàng",
  },
  {
    fieldKey: "total",
    header: "Tổng tiền",
  },
  {
    fieldKey: "username",
    header: "Tài khoản",
  },
  {
    fieldKey: "fullname",
    header: "Họ tên",
  },
  {
    fieldKey: "phone_number",
    header: "Số điện thoại",
  },
  {
    fieldKey: "company_name",
    header: "Tên công ty",
  },

  {
    fieldKey: "createdAt",
    header: "Thời gian tạo đơn",
  },
  {
    fieldKey: "status",
    header: "Trạng thái đơn hàng",
  },
];

export const OrderListToCSV = () => {
  const { orderList } = useContext(OrderListContext);
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Xuất pdf
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={2}>
          <Box>
            <Typography>
              {" "}
              File gồm {orderList.length} hàng trong bảng sẽ được tải xuống{" "}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Đóng
            </Button>
            <ReactExportCsv
              buttonProps={{ onClick: () => setOpen(false) }}
              fileName="danh-sach-don-hang"
              data={toCsv(orderList, fields)}
            />
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};
function toCsv(data: IOrderRow[], fields: TField[]) {
  const dataJson = JSON.stringify(data);

  const orders: IOrderRow[] = JSON.parse(dataJson);
  const newData: Record<string, unknown>[] = [];

  for (let order of orders) {
    let items = order.items;
    let obj: Record<string, unknown> = {};
    // loop fields
    for (let field of fields) {
      // create new property with each field
      let orderKey = field.fieldKey;
      let objVal = order[orderKey];
      let objKey = field.header;

      obj[objKey] = objVal;
    }
    // column name can't defined by field (order detail)
    for (let item of items) {
      let objKeyQty = item.egg.type_name + " số lượng";
      let objValQty = item.quantity;

      obj[objKeyQty] = objValQty;

      let objKeyPrice = item.egg.type_name + " giá";
      let objValPrice = item.deal_price;
      obj[objKeyPrice] = objValPrice;

      let objKeyTotal = item.egg.type_name + " thành tiền";
      let objValTotal = objValPrice * objValQty;
      obj[objKeyTotal] = objValTotal;
    }

    // push object to newData
    newData.push(obj);
  }
  return newData;
}
