export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserChangePassword {
  current_password: string;
  new_password: string;
}

export interface IUserProfile {
  username: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
}
export interface IUserAtom {
  username: string;
  phone_number: string;
  fullname: string;
  company_name?: string;
}
export type TUserUpdate = Omit<IUserProfile, "username">;
