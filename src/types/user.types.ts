export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  role: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  phone: string;
}

export type TRole = "ADMIN" | "SENDER" | "RECEIVER";
