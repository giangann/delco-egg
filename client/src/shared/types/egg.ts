export interface IEgg {
  id: number;
  type_name: string;
  weight: number;
  price: number;
  onStock: number;
}
export interface IEggInfo {
  type_name: string;
  weight: number;
}

export interface IEggPriceQty {
  egg: IEggInfo;
  egg_id: number;
  price_1: number;
  price_2: number;
  price_3: number;
  quantity: number;
  date: string;
}
