import { createContext } from "react";
import { ORDER_STATUS } from "../shared/constants/orderStatus";
import { IOrderRow } from "../shared/types/order";
import { IPagination } from "../shared/types/base";
import { defaultPagi } from "../shared/constants/common";

export type FilterParams = {
  start_date?: string;
  end_date?: string;
  phone_number?: string;
  fullname?: string;
};
export type OrderParams = {
  status: ORDER_STATUS | null;
  page?: number;
  limit?: number;
} & FilterParams;
export const OrderListContext = createContext<{
  params: OrderParams;
  setParams: (key: keyof OrderParams, value: any) => void;
  clearParams: (key: keyof OrderParams) => void;
  onViewDetail: (order: IOrderRow) => void;
  orderList: IOrderRow[];
  pagination: IPagination;
}>({
  params: { status: null, page: 1, limit: 2 },
  setParams(_key, _value) {},
  clearParams(_key) {},
  onViewDetail(_order) {},
  orderList: [],
  pagination: defaultPagi,
});
