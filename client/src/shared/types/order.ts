export interface IOrderItem {
  egg_id: number;
  quantity: number;
  deal_price: number;
}

export interface IOrder {
  date: string;
  time: string;
  items: IOrderItem[];
}

export interface ISaveOrder {
  date: string | null;
  time: string | null;
  items: IOrderItem[] | null;
}

export interface IOrderRow {
  date: string;
  time: string;
  status: number;
  createdAt: string;
}
