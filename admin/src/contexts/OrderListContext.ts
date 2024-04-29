import { createContext } from "react";
import { ORDER_STATUS } from "../shared/constants/orderStatus";
import { IOrderRow } from "../shared/types/order";
import { IPagination } from "../shared/types/base";

export type OrderParams = {
  status: ORDER_STATUS | null;
  page?: number;
  limit?: number;
};
export const OrderListContext = createContext<{
  params: OrderParams;
  setParams: (_key: keyof OrderParams, value: any) => void;
  onViewDetail: (order: IOrderRow) => void;
  orderList: IOrderRow[];
  pagination?: IPagination;
}>({
  params: { status: null, page: 1, limit: 2 },
  setParams(_key, _value) {},
  onViewDetail(_order) {},
  orderList: [],
});

// export const OrderListContext = createContext<{
//   params: OrderParams;
//   setParams: (_key: keyof OrderParams, value: any) => void;
//   onViewDetail: (order: IOrderRow) => void;
//   orderList: IOrderRow[];
//   pagination?: IPagination;
// } | null>(null);
