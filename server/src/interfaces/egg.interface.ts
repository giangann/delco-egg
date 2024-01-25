// egg: id, type_name, weight, createdAt
// weight with unstable unit so should be string instead of int

export interface ICreateEgg {
  type_name: string;
  weight: string;
}

export interface IUpdateEgg {
  id: number;
  type_name: string;
  weight: string;
}
