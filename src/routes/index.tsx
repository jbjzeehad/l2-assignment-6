import App from "@/App";
import DashBoard from "@/components/layout/DashBoard";
import Overview from "@/pages/Admin/Overview";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Unauthorised from "@/pages/Auth/Unauthorised";
import AboutPage from "@/pages/Public/About";
import ContactPage from "@/pages/Public/Contact";
import ParcelStatus from "@/pages/Reciever/ParcelStatus";
import { withAuth } from "@/utils/authCheck";
import { generateRoute } from "@/utils/generateRoute";
import { createBrowserRouter, Navigate } from "react-router";
import { adminDashboardRoutes } from "./admin.route";
import CreateParcel from "@/pages/Sender/CreateParcel";
import { senderDashboardRoutes } from "./sender.route";
import ParcelTracking from "@/pages/Public/ParcelTrack";
import HomePageWithTour from "@/pages/Public/Tour";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePageWithTour,
        index: true,
      },
      {
        Component: AboutPage,
        path: "about",
      },
      {
        Component: ContactPage,
        path: "contact",
      },
      {
        Component: ParcelTracking,
        path: "track",
      },
    ],
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Unauthorised,
    path: "/unauthorized",
  },
  {
    Component: withAuth(DashBoard, "ADMIN"),
    path: "/admin",
    children: [
      {
        index: true,
        Component: Overview,
      },
      ...generateRoute(adminDashboardRoutes),
    ],
  },
  {
    Component: withAuth(DashBoard, "SENDER"),
    path: "/sender",
    children: [
      {
        index: true,
        Component: CreateParcel,
      },
      ...generateRoute(senderDashboardRoutes),
    ],
  },
  {
    Component: withAuth(DashBoard, "RECEIVER"),
    path: "/receiver",
    children: [
      {
        index: true,
        element: <Navigate to="/receiver/parcelStatus" />,
      },
      {
        Component: ParcelStatus,
        path: "parcelStatus",
      },
    ],
  },
]);
