// egg: id, type_name, weight, createdAt

export interface ICreateEgg {
  type_name: string;
  weight: number;
}

export interface IUpdateEgg {
  id: number;
  type_name: string;
  weight: number;
}
