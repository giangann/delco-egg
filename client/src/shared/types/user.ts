export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserProfile {
  username: string;
  password: string;
  fullname: string;
  phone_number: string;
  company_name?: string;
}

export type UserUpdate = Omit<IUserProfile, "username">;
