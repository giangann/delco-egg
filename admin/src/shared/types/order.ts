export interface IOrderItem {
  egg_id: number;
  quantity: number;
  deal_price: number;
}

export interface IOrder {
  date: string;
  time: string;
  orders: IOrderItem[];
}

export interface IOrderRow {
  id: number | string;
  date: string;
  time: string;
  status: number;
  createdAt: string;
  username: string;
  fullname: string;
  phone_number: string;
  company_name: string;
}
