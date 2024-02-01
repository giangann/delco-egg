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
  date: string;
  time: string;
  status: number;
  createdAt: string;
}
