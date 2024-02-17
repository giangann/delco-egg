// Noti interfaces for order
export interface INoti {
  createdAt: string;
  content: string;
  from_user: {
    username: string;
  };
  order_id: number;
  is_read:boolean,
}
