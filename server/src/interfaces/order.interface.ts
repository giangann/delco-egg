export interface ICreateOrder {
  id: number;
  status: number;
  user_id: number;
  date: string;
  time: string;
  reason?: string;
  note?: string;
}

export type IUpdateStatusOrder = Pick<ICreateOrder, 'status' | 'id'>;
