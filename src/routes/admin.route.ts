import type { IDashboard } from "@/types";
import { lazy } from "react";

const Overview = lazy(() => import("@/pages/Admin/Overview"));
const Users = lazy(() => import("@/pages/Admin/USers"));
const Parcels = lazy(() => import("@/pages/Admin/Parcels"));

export const adminDashboardRoutes: IDashboard[] = [
  {
    title: "Overview",
    url: "/admin",
    component: Overview,
  },
  {
    title: "Users",
    url: "/admin/users",
    component: Users,
  },

  {
    title: "Parcels",
    url: "/admin/parcels",
    component: Parcels,
  },
];
