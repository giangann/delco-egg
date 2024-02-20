import { ORDER_STATUS } from "../constants/orderStatus";

// Noti interfaces for order
export interface INoti {
  id: number;
  createdAt: string;
  content: string;
  from_user: {
    username: string;
    fullname: string;
  };
  order_id: number;
  is_read: boolean;
  new_status: ORDER_STATUS;
}
