export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserCreate {
  username: string;
  password: string;
  phone_number: string;
  fullname: string;
  company_name?: string;
  note?: string;
  isAdmin?: string;
}
