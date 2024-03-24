import { createContext } from "react";
import { ORDER_STATUS } from "../shared/constants/orderStatus";

export type OrderParams = {
  status: ORDER_STATUS | null;
};
export const OrderListParamsContext = createContext<{
  params: OrderParams;
  setParams: (_key: keyof OrderParams, value: any) => void;
}>({ params: { status: null }, setParams(_key, _value) {} });
