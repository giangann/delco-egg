export interface IUserLogin {
  username: string;
  password: string;
}
export interface IUserChangePassword {
  current_password: string;
  new_password: string;
}
export interface IUserAtom {
  username: string;
  phone_number: string;
  fullname: string;
  company_name?: string;
}
export interface IUserProfile {
  username: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
  note?: string;
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

export interface IUserList
  extends Partial<IUserCreate>,
    Record<string, unknown> {
  id: number | string;
}

export interface IUserRow {
  id: number;
  username: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
  note?: string;
}

export type TUserUpdate = Omit<IUserProfile, "username">;
