// @ts-nocheck
import { useEffect, useState } from "react";
import { Page } from "../../components/Page/Page";
import { useDevice } from "../../hooks/useDevice";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { CustomTable, StrictField } from "../../components/Table/Customtable";
import { IOrderRow } from "../../shared/types/order";

const fields: StrictField<IOrderRow>[] = [
  {
    header: "Id",
    fieldKey: "id",
    width: 50,
  },
  {
    header: "Ngày",
    fieldKey: "date",
    width: 250,
  },
  {
    header: "Giờ",
    fieldKey: "time",
    width: 250,
  },
  {
    header: "Trạng thái",
    fieldKey: "status",
    width: 250,
  },
  {
    header: "Ngày tạo",
    fieldKey: "createdAt",
    width: 250,
  },
];
export const List = () => {
  const { isMobile } = useDevice();
  const [myOrderList, setMyOrderList] = useState([]);
  useEffect(() => {
    async function fetchMyListOrder() {
      const res = await getApi("order");

      if (res.success) setMyOrderList(res.data);
    }
    fetchMyListOrder();
  }, []);
  return (
    <Page title="Quản lý đơn đặt trứng">
      <CustomTable
        fields={fields}
        data={myOrderList}
        rows={myOrderList.length}
      />
    </Page>
  );
};
