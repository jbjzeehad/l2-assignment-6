import type { IUser } from "./user.types";

export interface ILoginResponse {
  tokens: { accessToken: string; refreshToken: string };
  user: IUser;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
