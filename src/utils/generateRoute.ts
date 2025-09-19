import type { IDashboard } from "@/types";

export const generateRoute = (params: IDashboard[]) => {
  return params.map((item) => ({
    path: item.url,
    Component: item.component,
  }));
};
