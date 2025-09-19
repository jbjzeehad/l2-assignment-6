import { useAppSelector } from "@/hooks/redux";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const auth = useAppSelector((state) => state.auth);
    if (!auth.isloggedIn) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && requiredRole !== auth.user?.role) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
};
