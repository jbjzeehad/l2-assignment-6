import type { store } from "@/store/store";
import type { ComponentType } from "react";

export type { ILoginRequest, ILoginResponse } from "@/types/auth.types";

export type {
  ICreateParcel,
  IParcel,
  ParcelStatus,
  ParcelStatusLog,
  ParcelTypes,
} from "@/types/parcel.types";
export type { IUser, TRole } from "@/types/user.types";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}
export interface IError {
  statusCode: number;
  success: boolean;
  message: string;
}

export interface IDashboard {
  title: string;
  url: string;
  component: ComponentType;
}
