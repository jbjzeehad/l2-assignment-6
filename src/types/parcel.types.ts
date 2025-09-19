import type { IUser } from "./user.types";

export type ParcelTypes =
  | "Document"
  | "Box"
  | "Fragile"
  | "Electronics"
  | "Clothing"
  | "Perishable"
  | "Other";

export type ParcelStatus =
  | "Requested"
  | "Approved"
  | "Dispatched"
  | "In Transit"
  | "Delivered"
  | "Cancelled"
  | "Blocked";

export const parcelStatusOptions: ParcelStatus[] = [
  "Requested",
  "Approved",
  "Dispatched",
  "In Transit",
  "Delivered",
  "Cancelled",
  "Blocked",
];

export interface ParcelStatusLog {
  timestamp: Date;
  status: ParcelStatus;
  updatedBy: IUser;
  location: string;
  notes?: string;
}

export interface IParcel {
  _id?: string;
  title: string;
  weight: number;
  deliveryDate: Date;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  trackingId?: string;
  sender: IUser;
  receiver: IUser;
  toAddress: string;
  toPhone: string;
  fromAddress: string;
  fromPhone: string;
  fee: number;
  type: ParcelTypes;
  status: ParcelStatus;
  statusLogs: ParcelStatusLog[];
}
export interface ICreateParcel {
  title: string;
  weight: number;
  deliveryDate: Date;
  receiverEmail: string;
  fee: number;
  type: ParcelTypes;
  receiver?: string;
}
