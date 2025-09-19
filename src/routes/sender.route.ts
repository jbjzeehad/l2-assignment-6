import type { IDashboard } from "@/types";
import { lazy } from "react";

const ViewParcels = lazy(() => import("@/pages/Sender/ViewParcels"));
const CreateParcel = lazy(() => import("@/pages/Sender/CreateParcel"));

export const senderDashboardRoutes: IDashboard[] = [
  {
    title: "View Parcels",
    url: "/sender/parcels",
    component: ViewParcels,
  },
  {
    title: "Create Parcel",
    url: "/sender/create-parcel",
    component: CreateParcel,
  },
];
