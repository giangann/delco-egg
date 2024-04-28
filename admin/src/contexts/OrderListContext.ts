import { createContext } from "react";
import { ORDER_STATUS } from "../shared/constants/orderStatus";
import { IOrderRow } from "../shared/types/order";

export type OrderParams = {
  status: ORDER_STATUS | null;
};
export const OrderListContext = createContext<{
  params: OrderParams;
  setParams: (_key: keyof OrderParams, value: any) => void;
  onViewDetail: (order: IOrderRow) => void;
  orderList: IOrderRow[];
}>({
  params: { status: null },
  setParams(_key, _value) {},
  onViewDetail(_order) {},
  orderList: [],
});
